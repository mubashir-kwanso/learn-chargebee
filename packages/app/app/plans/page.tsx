import PlansList from "./plans-list";
import { PlanResponse } from "./types";

export default async function Plans() {
  const plans: PlanResponse[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chargebee/plans`
  ).then((res) => res.json());

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">Plans</h1>

      <PlansList plans={plans} />
    </div>
  );
}
