import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../components/LayoutComponents/Layout/Layout';
import { useState } from 'react';
import { useAlert } from '../components/AlertContext/AlertContext';
import { signUp } from '../data/api';
import ROUTER_CONSTANT from '../constants/router';

function SignUp() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
  });
  const router = useRouter();
  const triggerAlert = useAlert();

  const handleSubmit = async e => {
    e.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const username = userData.username;
    const email = userData.email;
    const password = userData.password;

    try {
      const user = await signUp(username, email, password);
      if (user) {
        triggerAlert('Utilisateur enregistré', false);
        router.push(ROUTER_CONSTANT.SIGNIN);
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {userData.error && <p>{userData.error}</p>}
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
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={event =>
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
          onChange={event =>
            setUserData(
              Object.assign({}, userData, { password: event.target.value }),
            )
          }
        />
        <button type="submit">Sign up</button> or{' '}
        <Link href={ROUTER_CONSTANT.SIGNIN}>
          <a>Sign in</a>
        </Link>
      </form>
    </Layout>
  );
}

export default SignUp;
