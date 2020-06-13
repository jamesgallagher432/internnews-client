import gql from 'graphql-tag'

const UPDATE_PROFILE = gql`
  mutation ResetPassword($oldPassword: String, $newPassword: String) {
    resetPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      username
      email
      about
      createdAt
      links {
        id
        title
        slug
        description
        by {
          id
          username
        }
        comments {
          id
        }
        upvotes {
          id
        }
        createdAt
      }
      comments {
        id
        description
        user {
          id
          username
        }
        createdAt
      }
      upvotes {
        id
        link {
          id
          title
          slug
          description
          by {
            id
            username
          }
          comments {
            id
          }
          upvotes {
            id
          }
          createdAt
        }
      }
    }
  }
`;

export default UPDATE_PROFILE;
