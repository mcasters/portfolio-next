import Content from '../components/Content/Content';
import CONT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './styles/contact.module.css';
import Layout from '../components/LayoutComponents/Layout/Layout';
import {getContent} from "../data/lib/api";

export default function contact({ address, phone, email }) {
  const title = TITLE.CONTACT;
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
          <a href={`mailto:${email.text}`}>{email.text}</a>
        </div>
      </address>
    </Layout>
  );
}

export async function getServerSideProps() {
  const address = await getContent(CONT_CONST.KEY.CONTACT_ADDRESS);
  const phone = await getContent(CONT_CONST.KEY.CONTACT_PHONE);
  const email = await getContent(CONT_CONST.KEY.CONTACT_EMAIL);
  return {
    props: { address, phone, email },
  };
}

