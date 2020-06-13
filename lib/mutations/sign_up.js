import gql from 'graphql-tag'

const SIGN_UP = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(
      username: $username,
      authProvider: {
        credentials: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }
  }
`;

export default SIGN_UP;
