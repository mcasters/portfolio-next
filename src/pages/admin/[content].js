import PropTypes from 'prop-types';

import AdminHome from '../../components/administration/AdminHome';
import AdminItem from '../../components/administration/AdminItem';
import AdminPresentation from '../../components/administration/AdminPresentation';
import AdminContact from '../../components/administration/AdminContact';
import AdminNav from '../../components/layout-components/header/navigation/admin-nav/AdminNav';
import Layout from '../../components/layout-components/layout/Layout';
import TITLE from '../../constants/pageTitle';
import ITEM from '../../constants/itemConstant';
import LogoutButton from "../../components/administration/LogoutButton";

export default function ContentPage({ content }) {
  return (
    <Layout>
      <h1>{TITLE.ADMINISTRATION}</h1>
      <LogoutButton />
      <AdminNav />
      {content === 'accueil' && <AdminHome />}
      {content === 'presentation' && <AdminPresentation />}
      {content === 'peintures' && <AdminItem type={ITEM.PAINTING.TYPE} />}
      {content === 'sculptures' && <AdminItem type={ITEM.SCULPTURE.TYPE} />}
      {content === 'dessins' && <AdminItem type={ITEM.DRAWING.TYPE} />}
      {content === 'contact' && <AdminContact />}
    </Layout>
  );
}

ContentPage.propTypes = {
  content: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  const { content } = context.params;
  return {
    props: {
      content,
    },
  };
}
