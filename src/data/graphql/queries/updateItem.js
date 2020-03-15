import gql from 'graphql-tag';

export default gql`
  mutation UpdateItem($id: ID!, $item: ItemInput!) {
    updateItem(id: $id, input: $item) {
      id
      title
      date
      technique
      description
      height
      width
      length
    }
  }
`;
