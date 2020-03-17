import 'isomorphic-unfetch';

import GET_CONTENT from './graphql/queries/getContent';

const API_URL = 'https://api/graphql';

const fetchAPI = async (query, { variables } = {}) => {
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
};

export async function getContent(key) {
  const data = await fetchAPI(GET_CONTENT, {
    variables: {
      key,
    },
  });
  return data?.content;
}
