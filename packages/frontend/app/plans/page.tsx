"use client";

import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTION_PLANS } from "@/graphql/queries/subscriptions.queries";
import PlansList from "./plans-list";

export default function Plans() {
  const { data, loading, error } = useQuery(GET_SUBSCRIPTION_PLANS);

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">Plans</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data?.plans && <PlansList plans={data.plans} />}
    </div>
  );
}
