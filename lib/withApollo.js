import withApollo from 'next-with-apollo';
import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { parseCookies } from 'nookies';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const cookies = parseCookies();

  const token = cookies.authentication;
  if (token) {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authentication: token ? `${token}` : "",
      }
    }
  } else {
    return {
      headers: {
        ...headers,
      }
    }
  }
});

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
      link: authLink.concat(httpLink)
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
