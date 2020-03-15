import React from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { withApollo } from '../data/client';
import Field from '../components/FormElements/Field';
import { getErrorMessage } from '../components/lib/form';
import SignUpMutation from '../data/graphql/queries/signup';
import Layout from "../components/LayoutComponents/Layout/Layout";

function SignUp() {
  const [signUp] = useMutation(SignUpMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const usernameElement = event.currentTarget.elements.username;
    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await signUp({
        variables: {
          username: usernameElement.value,
          email: emailElement.value,
          password: passwordElement.value,
        },
      });

      router.push('/signin');
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <Layout>
      <h1>Sign Up</h1>
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
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <button type="submit">Sign up</button> or{' '}
        <Link href="signin">
          <a>Sign in</a>
        </Link>
      </form>
    </Layout>
  );
}

export default withApollo(SignUp);
