import gql from 'graphql-tag'

const CREATE_COMMENT_REPLY = gql`
  mutation CommentMutation($commentId: ID!, $description: String!) {
    createComment(commentId: $commentId, description: $description) {
      id
      description
    }
  }
`;

export default CREATE_COMMENT_REPLY;
