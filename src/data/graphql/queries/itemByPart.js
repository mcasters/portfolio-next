import gql from 'graphql-tag';

export default gql`
  query getItemsByPart($year: Int!, $type: String!, $half: Int!) {
    getItemsByPart(year: $year, type: $type, half: $half) {
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
