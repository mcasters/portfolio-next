/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import Link from 'next/link';

import s from './LoginControl.module.css';
import ROUTER_CONSTANT from '../../../../constants/router';
import getConfig from 'next/config';

const LoginControl = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const { ls_key, ls_value } = publicRuntimeConfig;

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsConnected(window.localStorage[ls_key] === ls_value);
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

export default LoginControl;
