"use client";

import React, { useEffect } from "react";
import { useChargebee } from "@/hooks/use-chargebee";

const AppProviders: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  useChargebee();
  return <>{children}</>;
};

export default AppProviders;
