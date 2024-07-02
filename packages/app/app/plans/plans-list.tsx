"use client";

import React, { useEffect, useRef, useState } from "react";
import { CardComponent } from "@chargebee/chargebee-js-react-wrapper";
import ChargebeeComponents from "@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup";
import { PaymentIntent } from "@chargebee/chargebee-js-types";
import { useUser } from "@/hooks/use-user";
import { useChargebee } from "@/hooks/use-chargebee";
import { axiosApi } from "@/utils/axios";
import { PlanResponse, PriceResponse, SubscriptionResponse } from "./types";

interface Props {
  plans: PlanResponse[];
}

const PlansList: React.FC<Props> = ({ plans }) => {
  const chargebeeInited = useChargebee();
  const [user] = useUser();
  const cardRef = useRef<ChargebeeComponents>(null);
  const [selectedPrice, setSelectedPrice] = useState<PriceResponse | null>(
    null
  );
  const [progressStatus, setProgressStatus] = useState<
    | "incomplete-card"
    | "complete-card"
    | "subscription-in-progress"
    | "subscription-completed"
    | "subscription-failed"
  >("incomplete-card");

  useEffect(() => {
    console.log("Progress Status:", progressStatus);
  }, [progressStatus]);

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

    if (!cardRef.current) {
      console.error("Card Element not found");
      return;
    }

    const cardElement = cardRef.current;

    try {
      setProgressStatus("subscription-in-progress");
      // Send the payment method to the server to create a payment intent
      const { data: paymentIntent } = await axiosApi.post<PaymentIntent>(
        "/chargebee/payment-intent",
        {
          email: user.email,
          priceId: selectedPrice.id,
        }
      );

      console.log("Payment intent created:", paymentIntent);

      const authorizedPaymentIntent = await cardElement.authorizeWith3ds(
        paymentIntent,
        {},
        {}
      );

      console.log("Authorized Payment Intent:", authorizedPaymentIntent);

      // Call Subscribe API to complete the subscription
      const subscriptionResponse = await axiosApi.post<SubscriptionResponse>(
        "/chargebee/subscription",
        {
          email: user.email,
          priceId: selectedPrice.id,
          paymentIntentId: paymentIntent.id,
        }
      );
      console.log("Subscription completed:", subscriptionResponse.data);
      setProgressStatus("subscription-completed");
      cardElement.clear();
    } catch (error) {
      console.log("Failed to create subscription:");
      console.dir(error);
      setProgressStatus("subscription-failed");
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

      {selectedPrice && !chargebeeInited ? (
        <div>Loading Chargebee SDK...</div>
      ) : (
        selectedPrice && (
          // Render Chargebee Card Element here
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
              <CardComponent
                ref={cardRef}
                onChange={(e: any) => {
                  setProgressStatus((prev) => {
                    if (prev === "subscription-in-progress") return prev;
                    return e.complete && !e.error
                      ? "complete-card"
                      : "incomplete-card";
                  });
                }}
              />
            </div>

            <div className="mt-4">
              <button
                className="block bg-blue-500 text-white p-2 rounded-md text-center w-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleSubscribe}
                disabled={
                  progressStatus === "incomplete-card" ||
                  progressStatus === "subscription-in-progress"
                }
              >
                Subscribe
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PlansList;
