import s from './styles/presentation.module.css';
import Content from '../components/Content/Content';
import CONT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import Layout from '../components/LayoutComponents/Layout/Layout';
import { getContent } from '../data/lib/api';

const Presentation = ({ content }) => {
  const title = TITLE.PRESENTATION;

  return (
    <Layout>
      <div className={s.presentationContainer}>
        <h1 className={s.title}>{title}</h1>
        <img
          className={s.image}
          src={`${CONT_CONST.CONTENT_IMAGE_PATH}/${CONT_CONST.PRESENTATION_IMAGE_TITLE}.jpg`}
          alt={CONT_CONST.PRESENTATION_IMAGE_ALT}
        />
        <Content content={content} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const content = await getContent(CONT_CONST.KEY.PRESENTATION);
  return {
    props: { content },
  };
}

export default Presentation;
