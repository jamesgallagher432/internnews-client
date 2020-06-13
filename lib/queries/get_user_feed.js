import gql from 'graphql-tag'

const FEED_QUERY = gql`
  query Users($user: Int) {
    allUsers(user: $user) {
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
        link {
          id
          title
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

export default FEED_QUERY;
