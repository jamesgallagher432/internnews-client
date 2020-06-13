import gql from 'graphql-tag'

const DELETE_LINK = gql`
  mutation DeleteLink($linkId: ID!) {
    deleteLink(linkId: $linkId) {
      id
    }
  }
`;

export default DELETE_LINK;
