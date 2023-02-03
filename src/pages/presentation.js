import PropTypes from 'prop-types';

import s from './styles/presentation.module.css';
import Content from '../components/content/Content';
import CONST from '../constants/content';
import TITLES from '../constants/pageTitle';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';

const Presentation = ({ data }) => {
  const title = TITLES.PRESENTATION;
  return (
    <Layout>
      <article className={s.container}>
        <h1 className={s.title}>{title}</h1>
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

Presentation.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Presentation;
