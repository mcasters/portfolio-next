import { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { withApollo } from '../data/apollo/client';
import SignOutMutation from '../data/graphql/queries/signout';
import ROUTER_CONSTANT from '../constants/router';

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SignOutMutation);

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push(ROUTER_CONSTANT.HOME);
      });
    });
  }, [signOut, router, client]);

  return <p>Déconnexion...</p>;
}

export default withApollo(SignOut);
