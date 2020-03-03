import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import s from './LoginDialog.module.css';
import SignInMutation from '../../data/graphql/queries/signin';
import Field from '../field';
import { getErrorMessage } from '../lib/form';
import { withApollo } from '../../data/client';

const customStyles = {
  overlay: {
    backgroundColor: 'none',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

function LoginDialog({ onClose, loginMutation }) {
  const [showModal, setShowModal] = useState(true);
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  const router = useRouter();

  const handleCloseModal = e => {
    e.preventDefault();
    setShowModal(false);
    onClose();
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const usernameElement = event.currentTarget.elements.username;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          username: usernameElement.value,
          password: passwordElement.value,
        },
      });
      if (data.signIn.user) {
        await router.push('/');
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <Modal
      id="auth"
      contentLabel="authentification"
      closeTimeoutMS={150}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <h1 className={s.loginTitle}>Authentification</h1>
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
    </Modal>
  );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default withApollo(LoginDialog);
