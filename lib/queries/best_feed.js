import gql from 'graphql-tag'

const BEST_FEED_QUERY = gql`
  query($first: Int, $last: Int){
    allLinks(order: "best", first: $first, last: $last) {
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
