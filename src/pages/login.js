import { withApollo } from '../data/client';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';

import Layout from '../components/Layout';
import LOGIN_MUTATION from '../data/graphql/queries/loginMutation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_MUTATION, {
    update(cache, mutationResult) {
      const data = {
        adminStatus: {
          __typename: 'AdminStatus',
          isConnected: mutationResult.data.login || false,
        },
      };
      cache.writeData({ data });
    },
    onError() {
      history.push('/home');
    },
    onCompleted(data) {
      return data.login
        ? console.log('OK : ' + data.login)
        : console.log('NOOOOO : ' + data.login);
    },
  });

  return (
    <Layout>
      <h1>Authentification</h1>
      <form
        onSubmit={e => {
          const input = {
            username,
            password,
          };
          login({ variables: { input } }).then(() => {
            console.log('FINISH');
          });
        }}
      >
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Utilisateur"
          autoComplete="username"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
      </form>
    </Layout>
  );
};

export default withApollo(Login);
