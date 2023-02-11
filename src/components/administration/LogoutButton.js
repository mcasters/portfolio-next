import useSWR from 'swr';
import getConfig from 'next/config';
import Router from 'next/router';

import {
  signOutRequest, fetcher,
} from '../../data/request/request';
import { ROUTES } from '../../constants/routes';
import { ISAUTHENTICATED} from '../../data/graphql/queries';
import { useAlert } from '../alert/Alert';

const LogoutButton = () => {
  const { publicRuntimeConfig } = getConfig();
  const { ls_key } = publicRuntimeConfig;
  const triggerAlert = useAlert();
  const { mutate } = useSWR(ISAUTHENTICATED, fetcher);

  return (
    <button
      type="button"
      className="button"
      onClick={() => {
        localStorage.removeItem(ls_key);
        signOutRequest().then((res) => {
          if (res.signOut) {
            mutate().then(() => {
              triggerAlert('Déconnecté', false);
              Router.replace(ROUTES.HOME);
            });
          } else {
            triggerAlert('Problème à la déconnexion', true);
          }
        });
      }}
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;
