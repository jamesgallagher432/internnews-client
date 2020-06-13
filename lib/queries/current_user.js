import gql from 'graphql-tag'

const USER_QUERY = gql`
  {
    currentUser {
      id
      username
      email
      about
      isAdmin
    }
  }
`;

export default USER_QUERY;
