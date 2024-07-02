"use client";

import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent, PaymentIntentResult } from "@stripe/stripe-js";
import { useUser } from "@/hooks/use-user";
import { axiosApi } from "@/utils/axios";
import {
  PaymentIntentResponse,
  PlanResponse,
  PriceResponse,
  SubscriptionResponse,
} from "./types";

interface Props {
  plans: PlanResponse[];
}

const PlansList: React.FC<Props> = ({ plans }) => {
  const [selectedPrice, setSelectedPrice] = useState<PriceResponse | null>(
    null
  );
  const stripe = useStripe();
  const elements = useElements();
  const [user] = useUser();

  const handleSubscribe = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }
    if (!selectedPrice) {
      return;
    }

    // Subscribe the user to the selected plan
    console.log("Subscribing to plan", selectedPrice);

    // Use the Stripe SDK to create a payment method
    if (!stripe || !elements) {
      console.error("Stripe not initialized");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card Element not found");
      return;
    }

    try {
      const paymentMethodResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (paymentMethodResult.error) {
        console.error(paymentMethodResult.error.message);
        return;
      }

      console.log("Payment Method created successfully:", paymentMethodResult);

      // Send the payment method to the server to create a payment intent
      const { data } = await axiosApi.post<PaymentIntentResponse>(
        "/chargebee/payment-intent",
        {
          paymentMethodId: paymentMethodResult.paymentMethod.id,
          priceId: selectedPrice.id,
          email: user.email,
        }
      );

      console.log("Payment intent created:", data);

      let paymentIntentResult:
        | PaymentIntentResult
        | { paymentIntent: Partial<PaymentIntent>; error?: undefined }
        | null = null;

      if (data.requires_action) {
        paymentIntentResult = await stripe.handleCardAction(data.client_secret);
      } else if (data.status === "requires_capture") {
        paymentIntentResult = {
          paymentIntent: {
            id: data.id,
            client_secret: data.client_secret,
            status: data.status,
          },
        };
      } else {
        console.error("Invalid Payment Intent status:", data.status);
        return;
      }
      if (paymentIntentResult.error) {
        console.error(
          "Failed to handle card action:",
          paymentIntentResult.error
        );
        return;
      }

      console.log("Payment intent result:", paymentIntentResult);

      // Call Subscribe API to complete the subscription
      const subscriptionResponse = await axiosApi.post<SubscriptionResponse>(
        "/chargebee/subscription",
        {
          paymentIntentId: paymentIntentResult.paymentIntent.id,
          priceId: selectedPrice.id,
          email: user.email,
        }
      );

      console.log("Subscription completed:", subscriptionResponse.data);
    } catch (error) {
      console.error("Failed to create subscription:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{plan.external_name}</h2>
            </div>

            <div>
              <h3 className="text-lg font-bold mt-4">Select Price</h3>
              <ul>
                {plan.prices.map((price) => (
                  <li
                    key={price.id}
                    onClick={() => setSelectedPrice(price)}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedPrice?.id === price.id
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {((price.price ?? 0) / 100).toFixed(2)}{" "}
                    {price.currency_code} / {price.period} {price.period_unit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <div className="text-center text-xl font-bold col-span-3">
            No plans available
          </div>
        )}
      </div>

      {selectedPrice && (
        // Render Stripe Card Element here
        <div className="border rounded-md p-4 max-w-lg">
          <h2 className="text-xl font-bold">
            Subscribe to {selectedPrice.name}
          </h2>
          <p className="mt-4">
            {(selectedPrice.price ?? 0) / 100} {selectedPrice.currency_code} /{" "}
            {selectedPrice.period} {selectedPrice.period_unit}
          </p>

          <div className="mt-4">
            <h1 className="font-semibold mb-4">Card Details</h1>
            <CardElement />
          </div>

          <div className="mt-4">
            <button
              className="block bg-blue-500 text-white p-2 rounded-md text-center w-full hover:bg-blue-600"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansList;
