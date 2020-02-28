import { withApollo } from '../apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import Layout from '../components/Layout';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`;

const Presentation = () => {
  const { data } = useQuery(ViewerQuery);

  if (data) {
    return (
      <Layout>
        <div>
          You're signed in as {data.viewer.name} and you're {data.viewer.status}{' '}
          goto{' '}
          <Link href="/about">
            <a>static</a>
          </Link>{' '}
          page.
        </div>
      </Layout>
    );
  }

  return null;
};

export default withApollo(Presentation);
