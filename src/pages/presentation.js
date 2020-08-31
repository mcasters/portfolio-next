import useSWR from 'swr';

import s from './styles/presentation.module.css';
import Content from '../components/content/Content';
import CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/api/queries';
import { contentRequest } from '../data/graphql/api/client-side/query-graphql';

const Presentation = () => {
  const { data } = useSWR(
    [CONTENT, CONST.KEY.PRESENTATION],
    contentRequest,
  );

  return (
    <Layout>
      <div className={s.presentationContainer}>
        <h1 className={s.title}>{TITLE.PRESENTATION}</h1>
        <img
          className={s.image}
          src={`${CONST.CONTENT_IMAGE_PATH}/${CONST.PRESENTATION_IMAGE_TITLE}.jpg`}
          alt={CONST.PRESENTATION_IMAGE_ALT}
        />
        {data && data.content && <Content text={data.content.text} />}
      </div>
    </Layout>
  );
};

export default Presentation;
