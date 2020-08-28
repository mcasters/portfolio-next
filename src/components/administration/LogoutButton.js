import useSWR from 'swr';
import getConfig from 'next/config';
import Router from 'next/router';

import {
  signoutRequest,
  viewerRequest,
} from '../../data/graphql/api/query-graphql';
import { ROUTES } from '../../constants/router';
import { VIEWER } from '../../data/graphql/api/queries';
import { useAlert } from '../alert-context/AlertContext';

const LogoutButton = () => {
  const { publicRuntimeConfig } = getConfig();
  const { ls_key } = publicRuntimeConfig;
  const { mutate } = useSWR(VIEWER, viewerRequest);
  const triggerAlert = useAlert();

  return (
    <button
      type="button"
      className="button"
      onClick={() => {
        localStorage.removeItem(ls_key);
        signoutRequest().then(() => {
          mutate();
          triggerAlert('Déconnecté', false);
          Router.replace(ROUTES.HOME);
        });
      }}
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;
