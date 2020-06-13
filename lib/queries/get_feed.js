import gql from 'graphql-tag'

const FEED_QUERY = gql`
  query Links($link: String) {
    allLinks(link: $link) {
      id
      url
      description
      title
      slug
      by {
        id
        username
      }
      upvotes {
        id
      }
      comments {
        id
        user {
          id
          username
        }
        parent {
          id
        }
        childEvents {
          id
        }
        description
      }
      createdAt
    }
  }
`;

export default FEED_QUERY;
