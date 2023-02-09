import PropTypes from 'prop-types';

import AdminHome from '../../components/administration/AdminHome';
import AdminItem from '../../components/administration/AdminItem';
import AdminPresentation from '../../components/administration/AdminPresentation';
import AdminContact from '../../components/administration/AdminContact';
import AdminNav from '../../components/layout-components/header/navigation/admin-nav/AdminNav';
import Layout from '../../components/layout-components/layout/Layout';
import TITLE from '../../constants/pageTitle';
import ITEM from '../../constants/itemConstant';
import LogoutButton from '../../components/administration/LogoutButton';

export default function ContentPage({ pageCalled }) {
  const isHome = pageCalled === 'accueil';
  const isPresentation = pageCalled === 'presentation';
  const isPaintings = pageCalled === 'peintures';
  const isSculptures = pageCalled === 'sculptures';
  const isDrawings = pageCalled === 'dessins';
  const isContact = pageCalled === 'contact';
  const title = TITLE[`${pageCalled}`];

  console.log(title);

  return (
    <Layout>
      <h1>{title}</h1>
      <LogoutButton />
      <AdminNav />
      {isHome && <AdminHome />}
      {isPresentation && <AdminPresentation />}
      {isPaintings && <AdminItem type={ITEM.PAINTING.TYPE} />}
      {isSculptures && <AdminItem type={ITEM.SCULPTURE.TYPE} />}
      {isDrawings && <AdminItem type={ITEM.DRAWING.TYPE} />}
      {isContact && <AdminContact />}
    </Layout>
  );
}

ContentPage.propTypes = {
  pageCalled: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  const { pageCalled } = context.params;
  return {
    props: {
      pageCalled,
    },
  };
}
