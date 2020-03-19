import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../components/LayoutComponents/Layout/Layout';
import ROUTER_CONSTANT from '../constants/router';
import { signIn } from '../data/api';

const SignIn = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: '',
  });
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const username = userData.username;
    const password = userData.password;

    try {
      const user = await signIn(username, password);
      if (user) router.push(ROUTER_CONSTANT.ADMIN);
    } catch (error) {
      console.error(error);
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
        {userData.error && <p>{userData.error}</p>}
        <input
          type="text"
          id="username"
          name="username"
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
          value={userData.password}
          onChange={event =>
            setUserData(
              Object.assign({}, userData, { password: event.target.value }),
            )
          }
        />
        <button type="submit">Sign in</button> or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
        {userData.error && <p className="error">Error: {userData.error}</p>}
      </form>
    </Layout>
  );
};

export default SignIn;
