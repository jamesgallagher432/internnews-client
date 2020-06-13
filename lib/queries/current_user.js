import gql from 'graphql-tag'

const USER_QUERY = gql`
  {
    currentUser {
      id
      username
      email
      about
    }
  }
`;

export default USER_QUERY;
