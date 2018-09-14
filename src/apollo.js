import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://172.16.2.18:8003/graphql"
});

export default client