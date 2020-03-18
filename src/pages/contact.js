import Content from '../components/Content/Content';
import CONT_CONST from '../constants/content';
import GLOB_CONST from '../constants/globalConstants';
import TITLE from '../constants/pageTitle';
import s from './styles/contact.module.css';
import Layout from '../components/LayoutComponents/Layout/Layout';
import {getContent} from "../data/api";

export default function contact({ address, phone }) {
  const title = TITLE.CONTACT;
  const email = GLOB_CONST.EMAIL;
  return (
    <Layout>
      <address>
        <h1 className="hidden">{title}</h1>
        <div className={s.contactContent}>
          <Content content={address} />
        </div>
        <div className={s.contactContent}>
          <Content content={phone} />
        </div>
        <div className={s.contactContent}>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </address>
    </Layout>
  );
}

export async function getServerSideProps() {
  const address = await getContent(CONT_CONST.KEY.CONTACT_ADDRESS);
  const phone = await getContent(CONT_CONST.KEY.CONTACT_PHONE);
  return {
    props: { address, phone },
  };
}

