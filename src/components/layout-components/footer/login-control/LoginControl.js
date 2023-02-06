/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import Link from 'next/link';

import s from './LoginControl.module.css';
import { NAMES, ROUTES } from '../../../../constants/routes';
import getConfig from 'next/config';

const LoginControl = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const { ls_key, ls_value } = publicRuntimeConfig;

  useEffect(() => {
      setIsConnected(window.localStorage[ls_key] === ls_value);
  }, [isConnected, ls_key, ls_value]);

  if (isConnected) {
    return (
      <Link href={ROUTES.ADMIN}>
        <a className={s.link}>{NAMES.ADMIN}</a>
      </Link>
    );
  }

  return (
    <>
      <Link href={ROUTES.SIGNIN}>
        <a className={s.link}>{NAMES.SIGNIN}</a>
      </Link>
    </>
  );
};

export default LoginControl;
