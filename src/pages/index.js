import Layout from '../components/LayoutComponents/Layout/Layout';
import Content from '../components/Content/Content';
import CONTENT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './index.module.css';

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
