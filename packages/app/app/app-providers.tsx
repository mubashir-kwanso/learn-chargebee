"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/apollo/client";
import { ChargebeeProvider } from "@/context/chargebee.context";

const AppProviders: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ChargebeeProvider>{children}</ChargebeeProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
