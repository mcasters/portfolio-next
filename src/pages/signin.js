import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { withApollo } from '../data/client';
import Field from '../components/field';
import { getErrorMessage } from '../components/lib/form';
import SignInMutation from '../data/graphql/queries/signin';
import Layout from "../components/LayoutComponents/Layout/Layout";
import ROUTER_CONSTANT from '../constants/router';

const SignIn = () => {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const usernameElement = e.currentTarget.elements.username;
    const passwordElement = e.currentTarget.elements.password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          username: usernameElement.value,
          password: passwordElement.value,
        },
      });
      if (data.signIn.user) {
        await router.push(ROUTER_CONSTANT.ADMIN);
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  };

  return (
    <Layout>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field
          name="username"
          type="username"
          autoComplete="username"
          required
          label="Username"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <button type="submit">Sign in</button> or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
      </form>
    </Layout>
  );
}

export default withApollo(SignIn);
