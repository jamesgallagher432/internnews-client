import gql from 'graphql-tag'

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $url: String!, $description: String!) {
    createLink(
      url: $url,
      description: $description,
      title: $title
    ) {
      id
      slug
    }
  }
`;

export default CREATE_POST;
