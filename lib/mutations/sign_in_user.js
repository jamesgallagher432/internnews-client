import gql from 'graphql-tag'

const SIGN_IN = gql`
  mutation SignInUser($username: String!, $password: String!) {
    signinUser (
      credentials: {
        username: $username,
        password: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

export default SIGN_IN;
