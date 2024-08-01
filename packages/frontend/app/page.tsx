"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

export default function Home() {
  const [user, setUser] = useUser();
  const router = useRouter();

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">Login</h1>

      <div className="flex justify-center mt-8">
        <form
          className="border rounded-md w-full max-w-xl p-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
            className="ring block w-full p-2 focus:outline-none focus:ring-blue-500 rounded-md"
          />
          <button
            type="button"
            className="block w-full p-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => {
              if (!user.email || !user.email.trim()) {
                return;
              }
              // Route to the plans page
              router.push("/plans");
            }}
          >
            Create Subscription
          </button>
          <button
            type="button"
            className="block w-full p-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => {
              if (!user.email || !user.email.trim()) {
                return;
              }
              // Route to the payment source page
              router.push("/payment-source");
            }}
          >
            Create Payment Source
          </button>
        </form>
      </div>
    </div>
  );
}
