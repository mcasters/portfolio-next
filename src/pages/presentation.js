import s from './styles/presentation.module.css';
import Content from '../components/content/Content';
import CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/api/queries';
import { queryGraphql } from '../data/graphql/api/server-side/query-graphql-ssr';

const Presentation = ({ data }) => {
  return (
    <Layout>
      <article className={s.presentationContainer}>
        <h1 className={s.title}>{TITLE.PRESENTATION}</h1>
        <img
          className={s.image}
          src={`${CONST.CONTENT_IMAGE_PATH}/${CONST.PRESENTATION_IMAGE_TITLE}.jpg`}
          alt={CONST.PRESENTATION_IMAGE_ALT}
        />
        {data.content && <Content text={data.content.text} />}
      </article>
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await queryGraphql(CONTENT, { key: CONST.KEY.PRESENTATION });
  return {
    props: {
      data,
    },
  };
}

export default Presentation;
