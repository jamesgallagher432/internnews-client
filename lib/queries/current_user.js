import gql from 'graphql-tag'

const USER_QUERY = gql`
  {
    currentUser {
      id
      username
    }
  }
`;

export default USER_QUERY;
