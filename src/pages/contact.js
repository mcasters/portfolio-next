import Content from '../components/Content/Content';
import CONT_CONST from '../constants/content';
import GLOB_CONST from '../constants/globalConstants';
import TITLE from '../constants/pageTitle';
import s from './styles/contact.module.css';
import Layout from '../components/LayoutComponents/Layout/Layout';

export default function contact() {
  const title = TITLE.CONTACT;
  const email = GLOB_CONST.EMAIL;
  return (
    <Layout>
      <address>
        <h1 className="hidden">{title}</h1>
        <div className={s.contactContent}>
          <Content keyContent={CONT_CONST.KEY.CONTACT_ADDRESS} />
        </div>
        <div className={s.contactContent}>
          <Content keyContent={CONT_CONST.KEY.CONTACT_PHONE} />
        </div>
        <div className={s.contactContent}>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </address>
    </Layout>
  );
}
