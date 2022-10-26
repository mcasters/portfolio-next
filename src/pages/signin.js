import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import getConfig from 'next/config';
import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/layout-components/layout/Layout';
import { ROUTES } from '../constants/routes';
import { useAlert } from '../components/alert-context/AlertContext';
import useCookie from '../components/hooks/useCookie';

import {
  signInRequest,
  signoutRequest,
  viewerRequest,
} from '../data/graphql/api/client-side/query-graphql';
import { VIEWER } from '../data/graphql/api/queries';

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
  const { mutate } = useSWR(VIEWER, viewerRequest);
  const { data, error } = useCookie();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData(Object.assign({}, userData, { message: '' }));

    const username = userData.username;
    const password = userData.password;

    const user = await signInRequest(username, password);

    if (!user) {
      setUserData(
          Object.assign({}, userData, {
            message: "Erreur d'authentification",
          }),
      );
      triggerAlert("Erreur d'authentification", true);
    }

    if (user) {
      try {
        const res = fetch('/api/cookies');
        const hh = await res.json();
        localStorage.setItem(ls_key, 'rrrr');
        await mutate();
        await Router.push(ROUTES.ADMIN);
      } catch (error) {
        setUserData(
          Object.assign({}, userData, {
            message: 'failed to setCookie',
          }),
        );
        triggerAlert('failed to setCookie', true);
      }
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