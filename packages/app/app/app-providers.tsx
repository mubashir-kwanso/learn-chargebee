"use client";

import React, { useEffect } from "react";
import { useChargebee } from "@/hooks/use-chargebee";

const AppProviders: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const Chargebee = useChargebee();
  useEffect(() => {
    if (Chargebee) {
      Chargebee.init({
        site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE!,
        publishableKey: process.env.NEXT_PUBLIC_CHARGEBEE_PUBLISHABLE_KEY!,
      });
    }
  }, [Chargebee]);

  return <>{children}</>;
};

export default AppProviders;
