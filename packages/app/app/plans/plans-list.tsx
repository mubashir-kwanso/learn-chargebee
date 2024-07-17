"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { CardComponent } from "@chargebee/chargebee-js-react-wrapper";
import ChargebeeComponents from "@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup";
import { PaymentIntent } from "@chargebee/chargebee-js-types";
import { useUser } from "@/hooks/use-user";
import { useChargebeeContext } from "@/context/chargebee.context";
import { GetSubscriptionPlansQuery } from "@/graphql/__generated__/graphql";
import {
  CREATE_CUSTOMER,
  CREATE_PAYMENT_INTENT,
  CREATE_SUBSCRIPTION,
} from "@/graphql/queries/subscriptions";

const subsidiaryId = "4bcb8602-e6b0-4023-ae4a-8d8f5d3f4b58";

type SubscriptionPlan = GetSubscriptionPlansQuery["plans"][0];
type SubscriptionPlanPrice = SubscriptionPlan["prices"][0];

interface Props {
  plans: SubscriptionPlan[];
}

const PlansList: React.FC<Props> = ({ plans }) => {
  const { isChargebeeInited } = useChargebeeContext();
  const [user] = useUser();
  const cardRef = useRef<ChargebeeComponents>(null);
  const [selectedPrice, setSelectedPrice] =
    useState<SubscriptionPlanPrice | null>(null);
  const [progressStatus, setProgressStatus] = useState<
    | "incomplete-card"
    | "complete-card"
    | "subscription-in-progress"
    | "subscription-completed"
    | "subscription-failed"
  >("incomplete-card");
  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION);

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

      // Create Customer
      await createCustomer({
        variables: {
          input: {
            email: user.email,
            firstName: "Mubashir",
            lastName: "Hassan",
            subsidiaryId,
            billingAddress: {
              line1: "Street 1",
              city: "Lahore",
              state: "Punjab",
              country: "PK",
            },
          },
        },
      });

      // Create Payment Intent
      const { data: createPaymentIntentData } = await createPaymentIntent({
        variables: {
          input: {
            subsidiaryId,
            priceId: selectedPrice.id,
          },
        },
      });
      if (!createPaymentIntentData) {
        throw new Error("Failed to create payment intent");
      }
      const { paymentIntent } = createPaymentIntentData;

      console.log("Payment intent created:", paymentIntent);

      const authorizedPaymentIntent = await cardElement.authorizeWith3ds(
        paymentIntent as PaymentIntent,
        {},
        {}
      );

      console.log("Authorized Payment Intent:", authorizedPaymentIntent);

      // Create Subscription
      const { data: createSubscriptionData } = await createSubscription({
        variables: {
          input: {
            subsidiaryId,
            priceId: selectedPrice.id,
            paymentIntentId: paymentIntent.id,
          },
        },
      });

      if (!createSubscriptionData) {
        throw new Error("Failed to create subscription");
      }

      console.log(
        "Subscription completed:",
        createSubscriptionData.subscription
      );
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
              <h2 className="text-xl font-bold">
                {plan.external_name ?? plan.name}
              </h2>
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

      {selectedPrice && !isChargebeeInited ? (
        <div>Loading Chargebee SDK...</div>
      ) : (
        selectedPrice && (
          // Render Chargebee Card Element here
          <div className="border rounded-md p-4 max-w-lg">
            <h2 className="text-xl font-bold">
              Subscribe to {selectedPrice.external_name ?? selectedPrice.name}
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
