const fetchAPI = async (query, { variables } = {}, context) => {
  const port = parseInt(process.env.PORT, 10) || 3000;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiUrl = `${url}:${port}/api/graphql`;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: context && context.req ? context.req.headers.cookie : undefined,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message || 'Failed to fetch API');
  }
  return json.data;
};

export async function addPicture(title) {
  const data = await fetchAPI(
    `
  mutation AddPicture($title: String!) {
  addPicture(title: $title)
}
`,
    {
      variables: {
        title,
      },
    },
  );
  return data.addPicture;
}
