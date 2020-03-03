import gql from "graphql-tag";

export default gql`
  mutation deleteItem($id: ID!, $type: String!) {
    deleteItem(id: $id, type: $type)
  }

`;
