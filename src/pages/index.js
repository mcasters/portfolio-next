import useSWR from 'swr';

import Content from '../components/content/Content';
import CONTENT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './styles/index.module.css';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/api/queries';
import { contentRequest } from '../data/graphql/api/query-graphql';

function Home() {
  const { data } = useSWR(
    [CONTENT, CONTENT_CONST.KEY.HOME3],
    contentRequest,
  );

  return (
    <Layout>
      <div className={s.container}>
        <h1 className="hidden">{TITLE.HOME}</h1>
        <div className={s.content}>
          {data && <Content text={data.content.text} />}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
