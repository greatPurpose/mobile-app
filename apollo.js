import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const GRAPHQL_ENDPOINT = `https://beautiful-hasura-dev.herokuapp.com/v1/graphql`;

const createApolloClient = () => {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      'x-hasura-admin-secret':'4iaovQUeUFCjUr+/GeZZRNC3u0kc4m2anZpfMvaaT88'
    }
  });
  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
};
export default createApolloClient;

// const isIn = authState.status === "in";
// const isIn = true;
//
// const headers = isIn ? { Authorization: `Bearer ${authState.token}` } : {};
//
// const httpLink = new HttpLink({
//   uri: "https://your-heroku-domain/v1alpha1/graphql",
//   headers
// });
//
// const link = split(
//     ({ query }) => {
//       const { kind, operation } = getMainDefinition(query);
//       return kind === "OperationDefinition" && operation === "subscription";
//     },
//     httpLink
// );
//
// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// });