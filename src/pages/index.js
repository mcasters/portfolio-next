import Content from '../components/content/Content';
import CONTENT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './styles/index.module.css';
import Layout from '../components/layout-components/layout/Layout';
import { getContent } from '../data/api/api';

function Home({ content }) {
  return (
    <Layout>
      <div className={s.container}>
        <h1 className="hidden">{TITLE.HOME}</h1>
        <div className={s.content}>
          <Content content={content} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const content = await getContent(CONTENT_CONST.KEY.HOME3);
  return {
    props: { content },
  };
}

export default Home;
