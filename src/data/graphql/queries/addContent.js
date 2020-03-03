import gql from "graphql-tag";

export default gql`
  mutation AddContent($input: ContentInput!) {
    addContent(input: $input) {
      id
      key
      text
    }
  }

`;
