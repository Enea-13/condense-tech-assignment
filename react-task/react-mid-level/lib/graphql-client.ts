import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";

const graphqlClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_EDNPOINT as string,
    headers: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
    },
  }),
  cache: new InMemoryCache(),
});

export default graphqlClient;

export const SEARCH_MOVIES = gql`
  query ($query: String!) {
    moviesCollection(filter: { title: { iregex: $query } }) {
      edges {
        node {
          id
          title
          year
          runtime
          genres
          director
          actors
          plot
          posterUrl
        }
      }
    }
  }
`;
