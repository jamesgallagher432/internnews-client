import gql from 'graphql-tag'

const BEST_FEED_QUERY = gql`
  {
    allLinks(order: "best") {
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
      }
      createdAt
    }
  }
`;

export default BEST_FEED_QUERY;
