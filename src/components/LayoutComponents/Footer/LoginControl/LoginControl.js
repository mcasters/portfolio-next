/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import Link from 'next/link';

import s from './LoginControl.module.css';
import { withApollo } from '../../../../data/apollo/client';
import ROUTER_CONSTANT from '../../../../constants/router';
import getConfig from 'next/config';

const LoginControl = () => {
  const { local_storage_admin, local_storage_secret } = getConfig();
  const onLocalStorage =
    typeof window !== 'undefined' &&
    window.localStorage[local_storage_admin] === local_storage_secret;
  const [isConnected, setIsConnected] = useState(onLocalStorage);

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsConnected(
        window.localStorage[local_storage_admin] === local_storage_secret,
      );
  }, [isConnected]);

  if (isConnected) {
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
