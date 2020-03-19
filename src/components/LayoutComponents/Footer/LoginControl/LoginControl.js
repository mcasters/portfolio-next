/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import Link from 'next/link';

import s from './LoginControl.module.css';
import { withApollo } from '../../../../data/apollo/client';
import ROUTER_CONSTANT from '../../../../constants/router';
import config from '../../../../../next.config';

const LoginControl = () => {
  const localStorageKey = config.env.localStorageSecret;
  const [adminIsConnected, setAdminIsConnected] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(localStorageKey)) setAdminIsConnected(true);
  });

  if (adminIsConnected) {
    return (
      <Link href={ROUTER_CONSTANT.ADMIN}>
        <a className={s.link}>Admin</a>
      </Link>
    );
  }

  return (
    <>
      <Link href={ROUTER_CONSTANT.SIGNIN}>
        <a className={s.link}>Admin in</a>
      </Link>
    </>
  );
};

export default withApollo(LoginControl);
