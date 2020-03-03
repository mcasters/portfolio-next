/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useRouter } from 'next/router';
import SignOutMutation from '../../data/graphql/queries/signout';
import { withApollo } from '../../data/client';
import ROUTER from "../../constants/router";

function Logout() {
  const router = useRouter();
  const [signOut, { client }] = useMutation(SignOutMutation);

  return (
    <button
      type="button"
      onClick={e => {
        e.preventDefault();
        signOut().then(() => {
          client.resetStore().then(() => {
            router.push(ROUTER.HOME);
          });
        });
      }}
    >
      Logout
    </button>
  );
}

export default withApollo(Logout);
