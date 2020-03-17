import gql from 'graphql-tag';

export default `
  query getContent($key: String!) {
    content(key: $key) {
      text
    }
  }
`;
