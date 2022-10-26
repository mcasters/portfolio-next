import { useRouter } from 'next/router';
import { useState } from 'react';
import getConfig from 'next/config';
import useSWR from 'swr';

import Layout from '../components/layout-components/layout/Layout';
import { ROUTES } from '../constants/routes';
import { useAlert } from '../components/alert-context/AlertContext';

import {
  signInRequest,
  isAuthenticatedRequest,
} from '../data/request/request';
import { ISAUTHENTICATED } from '../data/graphql/queries';

const SignIn = () => {
  const { publicRuntimeConfig } = getConfig();
  const { ls_key, ls_value } = publicRuntimeConfig;
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    message: '',
  });
  const triggerAlert = useAlert();
  const router = useRouter();
  const { mutate } = useSWR(ISAUTHENTICATED, isAuthenticatedRequest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData(Object.assign({}, userData, { message: '' }));

    const username = userData.username;
    const password = userData.password;

    const { data, error } = await signInRequest(username, password);

    if (error) {
      setUserData(
        Object.assign({}, userData, {
          message: error.message ? error.message : 'Failed to authenticate',
        }),
      );
      triggerAlert('Failed to authenticate', true);
    }
    if (data.signIn) {
      localStorage.setItem(ls_key, ls_value);
      await mutate();
      await router.push(ROUTES.ADMIN);
    }
  };

  return (
    <Layout>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Utilisateur"
          value={userData.username}
          onChange={(event) =>
            setUserData(
              Object.assign({}, userData, { username: event.target.value }),
            )
          }
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={userData.password}
          onChange={(event) =>
            setUserData(
              Object.assign({}, userData, { password: event.target.value }),
            )
          }
        />
        <button className="button" type="submit">
          Sign in
        </button>{' '}
        {/*<a href="signup">Sign up</a>*/}
        {userData.message && <p className="error">Error: {userData.message}</p>}
      </form>
    </Layout>
  );
};

export default SignIn;