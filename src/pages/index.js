import Content from '../components/content/Content';
import TITLE from '../constants/pageTitle';
import s from './styles/index.module.css';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/api/queries';
import { queryGraphql } from '../data/graphql/api/server-side/query-graphql-ssr';
import CONST from '../constants/content';

function Home({ data }) {
  return (
    <Layout>
      <div className={s.container}>
        <h1 className="hidden">{TITLE.HOME}</h1>
        <div className={s.content}>
          {data.content && <Content text={data.content.text} />}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await queryGraphql(CONTENT, {
    key: CONST.KEY.HOME3,
  });
  return {
    props: {
      data,
    },
  };
}

export default Home;
