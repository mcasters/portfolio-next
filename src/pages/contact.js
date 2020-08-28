import useSWR from 'swr';

import Content from '../components/content/Content';
import CONT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './styles/contact.module.css';
import Layout from '../components/layout-components/layout/Layout';
import { CONTENT } from '../data/graphql/api/queries';
import { contentRequest } from '../data/graphql/api/query-graphql';

export default function contact() {
  const { data: address } = useSWR(
    [CONTENT, CONT_CONST.KEY.CONTACT_ADDRESS],
    contentRequest,
  );
  const { data: phone } = useSWR(
    [CONTENT, CONT_CONST.KEY.CONTACT_PHONE],
    contentRequest,
  );
  const { data: email } = useSWR(
    [CONTENT, CONT_CONST.KEY.CONTACT_EMAIL],
    contentRequest,
  );

  return (
    <Layout>
      <address>
        <h1 className="hidden">{TITLE.CONTACT}</h1>
        <div className={s.contactContent}>
          {address && <Content text={address.content.text} />}
        </div>
        <div className={s.contactContent}>
          {phone && <Content text={phone.content.text} />}
        </div>
        <div className={s.contactContent}>
          {email && <a href={`mailto:${email.content.text}`}>{email.content.text}</a>}
        </div>
      </address>
    </Layout>
  );
}
