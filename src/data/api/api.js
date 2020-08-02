import 'isomorphic-unfetch';

const apiUrl = `${process.env.BACKEND_URL}/api/graphql`;

const fetchAPI = async (query, { variables } = {}, context) => {
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

export async function signIn(username, password) {
  const data = await fetchAPI(
    `
  mutation SignInMutation($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      user {
        id
        username
      }
    }
  }
`,
    {
      variables: {
        username,
        password,
      },
    },
  );
  return data?.signIn;
}

export async function signUp(username, email, password) {
  const data = await fetchAPI(
    `
  mutation SignUpMutation($username: String!, $email: String!, $password: String!) {
    signUp(input: { username:$username, email: $email, password: $password }) {
      user {
        id
        username
      }
    }
  }
`,
    {
      variables: {
        username,
        email,
        password,
      },
    },
  );
  return data.signUp;
}

export async function viewer(context) {
  const data = await fetchAPI(
    `
  query ViewerQuery {
    viewer
  }
`,
    {},
    context,
  );
  return data?.viewer;
}

export async function signOut() {
  const data = await fetchAPI(
    `
  mutation SignOutMutation {
    signOut
  }
`,
  );
  return data.signOut;
}

export async function getContent(key) {
  const data = await fetchAPI(
    `
  query getContent($key: String!) {
    getContent(key: $key) {
      text
    }
  }
`,
    {
      variables: {
        key,
      },
    },
  );
  return data?.getContent;
}

export async function getItemsByPart(year, type, half) {
  const data = await fetchAPI(
    `
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
`,
    {
      variables: {
        year,
        type,
        half,
      },
    },
  );
  return data?.getItemsByPart;
}

export async function getAllItems(type) {
  const data = await fetchAPI(
    `
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
`,
    {
      variables: {
        type,
      },
    },
  );
  return data?.getAllItems;
}

export async function addItem(item) {
  const data = await fetchAPI(
    `
  mutation AddItem($item: ItemInput!) {
    addItem(item: $item) {
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
`,
    {
      variables: {
        item,
      },
    },
  );
  return data.addItem;
}

export async function updateItem(item) {
  const data = await fetchAPI(
    `
  mutation UpdateItem($item: ItemInput!) {
    updateItem(item: $item) {
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
`,
    {
      variables: {
        item,
      },
    },
  );
  return data.updateItem;
}

export async function deleteItem(id, type) {
  const data = await fetchAPI(
    `
  mutation deleteItem($id: ID!, $type: String!) {
    deleteItem(id: $id, type: $type)
  }
`,
    {
      variables: {
        id,
        type,
      },
    },
  );
  return data.deleteItem;
}

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

export async function addContent(input) {
  const data = await fetchAPI(
    `
  mutation AddContent($input: ContentInput!) {
    addContent(input: $input) {
      id
      key
      text
    }
  }
`,
    {
      variables: {
        input,
      },
    },
  );
  return data.addContent;
}
