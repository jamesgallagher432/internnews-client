import gql from 'graphql-tag'

const CREATE_VOTE = gql`
  mutation VoteMutation($linkId: ID!) {
    createUpvote(linkId: $linkId) {
      id
      link {
        id
        upvotes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export default CREATE_VOTE;
