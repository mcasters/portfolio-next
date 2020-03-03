import gql from "graphql-tag";

export default gql`
  mutation AddItem($input: ItemInput!) {
    addItem(input: $input) {
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
