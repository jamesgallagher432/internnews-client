import gql from 'graphql-tag'

const NEW_FEED_QUERY = gql`
  query($first: Int, $last: Int){
    allLinks(first: $first, last: $last) {
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

export default NEW_FEED_QUERY;
