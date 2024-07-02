"use client";

import React from "react";
import { ChargebeeProvider } from "@/context/chargebee.context";

const AppProviders: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <ChargebeeProvider>{children}</ChargebeeProvider>;
};

export default AppProviders;
