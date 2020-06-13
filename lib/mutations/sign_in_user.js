import gql from 'graphql-tag'

const SIGN_IN = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signinUser (
      credentials: {
        email: $email,
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
