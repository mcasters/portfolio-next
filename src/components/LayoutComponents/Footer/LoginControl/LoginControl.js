/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import s from './LoginControl.module.css';
import ViewerQuery from '../../../../data/graphql/queries/viewer';
import { withApollo } from '../../../../data/client';
import ROUTER_CONSTANT from '../../../../constants/router';

const LoginControl = () => {
  const { data, loading } = useQuery(ViewerQuery);
  const [, setOpenDialog] = useState(false);

  React.componentWillUnmount = () => {
    setOpenDialog(false);
  };

  if (
    loading === false &&
    data &&
    data.viewer === null &&
    typeof window !== 'undefined'
  ) {
    return (
      <>
        <Link href={ROUTER_CONSTANT.SIGNIN}>
          <a className={s.link}>Admin in</a>
        </Link>
      </>
    );
  }

  if (data && data.viewer) {
    return (
      <Link href={ROUTER_CONSTANT.ADMIN}>
        <a className={s.link}>Admin</a>
      </Link>
    );
  }

  return <p>Loading...</p>;
};

export default withApollo(LoginControl);
