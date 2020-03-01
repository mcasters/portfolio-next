import gql from 'graphql-tag';

export default gql`
  query getContent($key: String!) {
    getContent(key: $key) {
      text
    }
  }

`;
