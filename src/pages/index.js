import TITLE from '../constants/pageTitle';
import s from './styles/index.module.css';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import CONST from '../constants/content';
import PropTypes from 'prop-types';

function Home({ data }) {
  return (
    <Layout introduction={data.content ? data.content.text : ''}>
      <div className={s.container}>
        <h1 className="hidden">{TITLE.HOME}</h1>
        <div className={s.content}></div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await queryGraphql(CONTENT, {
    key: CONST.KEY.INTRODUCTION,
  });
  return {
    props: {
      data,
    },
  };
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Home;
