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
    const stored = window.localStorage[ls_key];
    if (stored) {
      const { data } = JSON.parse(stored);
      setIsConnected(data === ls_value);
    }
  }, [isConnected, ls_key, ls_value]);

  if (isConnected) {
    return (
      <Link href={ROUTES.ADMIN} className={s.link} legacyBehavior={false}>
        {NAMES.ADMIN}
      </Link>
    );
  }

  return (
    <>
      <Link href={ROUTES.SIGNIN} className={s.link} legacyBehavior={false}>
        {NAMES.SIGNIN}
      </Link>
    </>
  );
};

export default LoginControl;
