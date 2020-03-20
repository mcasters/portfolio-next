import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import ROUTER_CONSTANT from '../constants/router';
import { signOut } from '../data/lib/api';
import { useAlert } from '../components/AlertContext/AlertContext';

function SignOut() {
  const { publicRuntimeConfig } = getConfig();
  const { ls_key } = publicRuntimeConfig;
  const router = useRouter();
  const triggerAlert = useAlert();

  useEffect(() => {
    localStorage.removeItem(ls_key);
    signOut().then(() => {
      triggerAlert('Déconnecté', false);
      router.push(ROUTER_CONSTANT.HOME);
    });
  }, [router]);

  return <p>Déconnexion...</p>;
}

export default SignOut;
