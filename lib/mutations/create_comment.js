import gql from 'graphql-tag'

const COMMENT_MUTATION = gql`
  mutation CommentMutation($linkId: ID!, $description: String!) {
    createComment(linkId: $linkId, description: $description) {
      id
      description
    }
  }
`;

export default COMMENT_MUTATION;
