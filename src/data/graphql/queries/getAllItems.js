import gql from "graphql-tag";

export default gql`
    query getAllItems($type: String!) {
        getAllItems(type: $type) {
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
