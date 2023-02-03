import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Layout from '../../components/layout-components/layout/Layout';
import TITLE from '../../constants/pageTitle';
import { queryGraphql } from '../../data/request/request-ssr';
import { ISAUTHENTICATED } from '../../data/graphql/queries';
import { ROUTES } from '../../constants/routes';
import AdminNav from '../../components/layout-components/header/navigation/admin-nav/AdminNav';

const Admin = ({ isAuthenticated }) => {
  const router = useRouter();

  if (!isAuthenticated) return router.push(ROUTES.SIGNIN);
  return (
    <Layout>
      <h1>{TITLE.ADMINISTRATION}</h1>
      <AdminNav />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const data = await queryGraphql(ISAUTHENTICATED, {}, context);

  if (typeof window === 'undefined' && !data.isAuthenticated)
    return {
      redirect: {
        destination: ROUTES.SIGNIN,
        permanent: false,
      },
    };

  return {
    props: {
      isAuthenticated: data.isAuthenticated,
    },
  };
}

Admin.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Admin;
