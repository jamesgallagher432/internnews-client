import gql from 'graphql-tag'

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($username: String!, $email: String!, $about: String!) {
    updateProfile(username: $username, email: $email, about: $about) {
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
