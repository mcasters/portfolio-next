import PropTypes from 'prop-types';

import s from './styles/presentation.module.css';
import Content from '../components/content/Content';
import CONST from '../constants/content';
import TITLES from '../constants/pageTitle';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import Image from 'next/image';

const Presentation = ({ data }) => {
  return (
    <Layout>
      <article>
        <h1 className={s.title}>{TITLES.PRESENTATION}</h1>
        <div className={s.container}>
          <Image
            src={`${CONST.CONTENT_IMAGE_PATH}/${CONST.PRESENTATION_IMAGE_TITLE}.jpg`}
            alt={CONST.PRESENTATION_IMAGE_ALT}
            quality={100}
            priority
            fill
            className={s.image}
          />
        </div>
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
