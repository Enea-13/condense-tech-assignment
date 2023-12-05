"use client";

import graphqlClient from "@/lib/graphql-client";
import { ApolloProvider } from "@apollo/client";

function GraphQLProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
}

export default GraphQLProvider;
