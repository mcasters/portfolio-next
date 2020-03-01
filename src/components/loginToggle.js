import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { withApollo } from '../data/client';
import ViewerQuery from '../data/graphql/queries/viewer';

const LoginToggle = () => {
  const { data, loading } = useQuery(ViewerQuery);

  if (
    loading === false &&
    data.viewer === null &&
    typeof window !== 'undefined'
  ) {
    return (
      <Link href="/signin">
        <a>signin</a>
      </Link>
    );
  }

  if (data && data.viewer) {
    return (
      <Link href="/signout">
        <a>signout</a>
      </Link>
    );
  }

  return (
    <p>Loading...</p>
  );
};

export default withApollo(LoginToggle);
