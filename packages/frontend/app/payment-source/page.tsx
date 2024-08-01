"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { CardComponent } from "@chargebee/chargebee-js-react-wrapper";
import ChargebeeComponents from "@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup";
import { useUser } from "@/hooks/use-user";
import { useChargebeeContext } from "@/context/chargebee.context";
import { CREATE_PAYMENT_SOURCE } from "@/graphql/mutations/subscriptions.mutations";

const subsidiaryId = "ef5b939a-4f39-4d17-b9ab-bbb8a1dd7131";

const PaymentSource: React.FC = () => {
  const { isChargebeeInited } = useChargebeeContext();
  const [user] = useUser();
  const cardRef = useRef<ChargebeeComponents>(null);
  const [progressStatus, setProgressStatus] = useState<
    | "incomplete-card"
    | "complete-card"
    | "payment-source-creation-in-progress"
    | "payment-source-created"
    | "payment-source-creation-failed"
  >("incomplete-card");

  const [createPaymentSource] = useMutation(CREATE_PAYMENT_SOURCE);

  useEffect(() => {
    console.log("Progress Status:", progressStatus);
  }, [progressStatus]);

  const handleCreatePaymentSource = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }

    if (!cardRef.current) {
      console.error("Card Element not found");
      return;
    }

    const cardElement = cardRef.current;

    try {
      setProgressStatus("payment-source-creation-in-progress");

      const token = await cardElement.tokenize({});
      console.log("Token:", { token });

      const { data } = await createPaymentSource({
        variables: {
          input: {
            subsidiaryId,
            token: token.token,
          },
        },
      });
      console.log("Payment Source created:", data);

      setProgressStatus("payment-source-created");
      cardElement.clear();
    } catch (error) {
      console.log("Failed to create payment source");
      console.dir(error);
      setProgressStatus("payment-source-creation-failed");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h2 className="text-xl font-bold">Create Payment Source</h2>
      <div className="my-4">
        {!isChargebeeInited ? (
          <div>Loading Chargebee SDK...</div>
        ) : (
          // Render Chargebee Card Element here
          <div className="border rounded-md p-4 max-w-lg">
            <div>
              <h1 className="font-semibold mb-4">Card Details</h1>
              <CardComponent
                ref={cardRef}
                onChange={(e: any) => {
                  setProgressStatus((prev) => {
                    if (prev === "payment-source-creation-in-progress")
                      return prev;
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
                onClick={handleCreatePaymentSource}
                disabled={
                  progressStatus === "incomplete-card" ||
                  progressStatus === "payment-source-creation-in-progress"
                }
              >
                Create Payment Source
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSource;
