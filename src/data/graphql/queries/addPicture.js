import gql from "graphql-tag";

export default gql`
  mutation AddPicture($picture: Upload!, $pictureTitle: String!) {
    addPicture(picture: $picture, title: $pictureTitle)
  }
`;
