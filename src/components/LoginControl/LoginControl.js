import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/Link';

import s from './LoginControl.module.css';
import LoginDialog from '../LoginDialog/LoginDialog';
import ViewerQuery from '../../data/graphql/queries/viewer';
import { withApollo } from '../../data/client';

const LoginControl = () => {
  const { data, loading } = useQuery(ViewerQuery);
  const [openLogin, setOpenDialog] = useState(false);

  React.componentWillUnmount = () => {
    setOpenDialog(false);
  };

  const closeLogin = () => {
    setOpenDialog(false);
  };

  if (
    loading === false &&
    data.viewer === null &&
    typeof window !== 'undefined'
  ) {
    return (
      <>
        <button
          type="button"
          className={s.loginLink}
          onClick={e => {
            e.preventDefault();
            setOpenDialog(true);
          }}
        >
          Admin in
        </button>
        {openLogin && <LoginDialog onClose={closeLogin} />}
      </>
    );
  }

  if (data && data.viewer) {
    return (
      <Link href="/admin">
        <a className={s.link}>Admin</a>
      </Link>
    );
  }

  return (
    <p>Loading...</p>
  );
};

export default withApollo(LoginControl);
