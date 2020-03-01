import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/LayoutComponents/Layout/Layout';
import Content from '../components/Content/Content';
import TITLE from '../constants/pageTitle';

function Home() {
  const title = TITLE.HOME;
  return (
    <Layout>
      <div className={s.homeContainer}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.homeContent}>
          <Content keyContent={CONTENT_CONST.KEY.HOME3} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
