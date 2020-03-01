import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { withApollo } from '../data/client';
import SignOutMutation from '../data/graphql/queries/signout';

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SignOutMutation);

  React.useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/signin');
      });
    });
  }, [signOut, router, client]);

  return <p>Signing out...</p>;
}

export default withApollo(SignOut);
