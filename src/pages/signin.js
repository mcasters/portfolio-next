import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import getConfig from "next/config";

import Layout from '../components/LayoutComponents/Layout/Layout';
import ROUTER_CONSTANT from '../constants/router';
import { signIn } from '../data/lib/api';
import { useAlert } from '../components/AlertContext/AlertContext';
import s from "../components/Admin/Item/ItemUpdate/UpdateForm/UpdateForm.module.css";

const SignIn = () => {
  const { publicRuntimeConfig } = getConfig();
  const { ls_key, ls_value } = publicRuntimeConfig;
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: '',
  });
  const router = useRouter();
  const triggerAlert = useAlert();

  const handleSubmit = async e => {
    e.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const username = userData.username;
    const password = userData.password;

    try {
      const user = await signIn(username, password);
      if (user) {
        console.log('ls_key //' + ls_key);
        console.log('ls_value //' + ls_value);
        localStorage.setItem(ls_key, ls_value);
        router.push(ROUTER_CONSTANT.ADMIN);
      }
    } catch (error) {
      triggerAlert(error.message, true);
      setUserData(
        Object.assign({}, userData, {
          error: error.message,
        }),
      );
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
          onChange={event =>
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
          onChange={event =>
            setUserData(
              Object.assign({}, userData, { password: event.target.value }),
            )
          }
        />
        <button className="button" type="submit">Sign in</button> or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
        {userData.error && <p className="error">Error: {userData.error}</p>}
      </form>
    </Layout>
  );
};

export default SignIn;
