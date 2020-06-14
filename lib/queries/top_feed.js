import gql from 'graphql-tag'

const TOP_FEED_QUERY = gql`
  {
    allLinks(order: "top") {
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
        children {
          id
        }
      }
      createdAt
    }
  }
`;

export default TOP_FEED_QUERY;
