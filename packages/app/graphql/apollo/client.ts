import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL + "/graphql",
  cache: new InMemoryCache(),
});
