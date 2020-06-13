import gql from 'graphql-tag'

const NEW_FEED_QUERY = gql`
  {
    allLinks {
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
