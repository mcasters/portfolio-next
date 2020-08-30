import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';

import Layout from '../components/layout-components/layout/Layout';
import { useAlert } from '../components/alert-context/AlertContext';
import { ROUTES } from '../constants/router';
import { signUpRequest } from '../data/graphql/api/query-graphql';

const SignUp = () => {
  const triggerAlert = useAlert();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const username = userData.username;
    const email = userData.email;
    const password = userData.password;

    const { data, error } = await signUpRequest(
      username,
      email,
      password,
    );

    if (data) {
      triggerAlert('Utilisateur enregistré', false);
      return Router.replace(ROUTES.SIGNIN);
    } else {
      triggerAlert(error ? error.message : "Echec à l'inscription", true);
      return Router.replace(ROUTES.HOME);
    }
  };

  return (
    <Layout>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {userData.error && <p>{userData.error}</p>}
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
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={(event) =>
            setUserData(
              Object.assign({}, userData, { email: event.target.value }),
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
          Sign up
        </button>{' '}
        or{' '}
        <Link href={ROUTES.SIGNIN}>
          <a>Sign in</a>
        </Link>
      </form>
    </Layout>
  );
};

export default SignUp;
