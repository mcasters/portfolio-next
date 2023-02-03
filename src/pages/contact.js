import Content from '../components/content/Content';
import CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './styles/contact.module.css';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import PropTypes from 'prop-types';

const contact = ({ dataAddress, dataPhone, dataEmail }) => {
  return (
    <Layout>
      <address>
        <h1 className={s.title}>{TITLE.CONTACT}</h1>
        <div className={s.contactContent}>
          {dataAddress.content && <Content text={dataAddress.content.text} />}
        </div>
        <div className={s.contactContent}>
          {dataPhone.content && <Content text={dataPhone.content.text} />}
        </div>
        <div className={s.contactContent}>
          {dataEmail.content && (
            <a href={`mailto:${dataEmail.content.text}`}>
              {dataEmail.content.text}
            </a>
          )}
        </div>
      </address>
    </Layout>
  );
};

export async function getServerSideProps() {
  const dataAddress = await queryGraphql(CONTENT, {
    key: CONST.KEY.CONTACT_ADDRESS,
  });
  const dataPhone = await queryGraphql(CONTENT, {
    key: CONST.KEY.CONTACT_PHONE,
  });
  const dataEmail = await queryGraphql(CONTENT, {
    key: CONST.KEY.CONTACT_EMAIL,
  });
  return {
    props: {
      dataAddress,
      dataPhone,
      dataEmail,
    },
  };
}

contact.propTypes = {
  dataAddress: PropTypes.object.isRequired,
  dataPhone: PropTypes.object.isRequired,
  dataEmail: PropTypes.object.isRequired,
};

export default contact;
