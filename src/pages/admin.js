/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useRouter } from 'next/router';

import s from './styles/admin.module.css';
import ItemConstant from '../constants/itemConstant';
import TITLE from '../constants/pageTitle';
import TAB from '../constants/adminPage';
import CONTENT from '../constants/content';
import EditContent from '../components/administration/content/EditContent';
import AdminItemParent from '../components/administration/AdminItemParent';
import EditPictureForm from '../components/administration/picture/EditPictureForm';
import Layout from '../components/layout-components/layout/Layout';
import { queryGraphql } from '../data/request/request-ssr';
import LogoutButton from '../components/administration/LogoutButton';
import { ISAUTHENTICATED } from '../data/graphql/queries';
import { ROUTES } from '../constants/routes';

const Admin = ({ isAuthenticated }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('indexAdminTab') !== null
    )
      setSelectedTab(parseInt(localStorage.getItem('indexAdminTab')));
  }, [selectedTab]);

  const handleSelectTab = (index) => {
    localStorage.setItem('indexAdminTab', index);
    setSelectedTab(index);
  };

  if (!isAuthenticated) return router.push(ROUTES.SIGNIN);
  return (
    <Layout>
      <div className={s.container}>
        <h1 className={s.title}>{TITLE.ADMINISTRATION}</h1>
        <LogoutButton />
        <Tabs
          selectedIndex={selectedTab}
          onSelect={handleSelectTab}
          className={s.tabs}
          forceRenderTabPanel
        >
          <TabList>
            <Tab>{TAB.HOME}</Tab>
            <Tab>{TAB.PRESENTATION}</Tab>
            <Tab>{ItemConstant.PAINTING.TITLE}</Tab>
            <Tab>{ItemConstant.SCULPTURE.TITLE}</Tab>
            <Tab>{ItemConstant.DRAWING.TITLE}</Tab>
            <Tab>{TAB.CONTACT}</Tab>
          </TabList>
          <TabPanel>
            <div className={s.tabContainer}>
              <EditPictureForm pictureTitle={CONTENT.HOME_IMAGE_PORTRAIT} />
              <EditPictureForm pictureTitle={CONTENT.HOME_IMAGE_LANDSCAPE} />
              <EditContent keyContent={CONTENT.KEY.HOME1} isTextArea />
              <EditContent keyContent={CONTENT.KEY.HOME2} isTextArea />
              <EditContent keyContent={CONTENT.KEY.HOME3} isTextArea />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={s.tabContainer}>
              <EditPictureForm
                pictureTitle={CONTENT.PRESENTATION_IMAGE_TITLE}
              />
              <EditContent keyContent={CONTENT.KEY.PRESENTATION} isTextArea />
            </div>
          </TabPanel>
          <TabPanel>
            <AdminItemParent type={ItemConstant.PAINTING.TYPE} />
          </TabPanel>
          <TabPanel>
            <AdminItemParent type={ItemConstant.SCULPTURE.TYPE} />
          </TabPanel>
          <TabPanel>
            <AdminItemParent type={ItemConstant.DRAWING.TYPE} />
          </TabPanel>
          <TabPanel>
            <div className={s.tabContainer}>
              <EditContent
                keyContent={CONTENT.KEY.CONTACT_ADDRESS}
                isTextArea
              />
              <EditContent
                keyContent={CONTENT.KEY.CONTACT_PHONE}
                isTextArea={false}
              />
              <EditContent
                keyContent={CONTENT.KEY.CONTACT_EMAIL}
                isTextArea={false}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const data = await queryGraphql(ISAUTHENTICATED, {}, context);

  if (typeof window === 'undefined' && !data.isAuthenticated)
    return {
      redirect: {
        destination: ROUTES.SIGNIN,
        permanent: false,
      },
    };

  return {
    props: {
      isAuthenticated: data.isAuthenticated,
    },
  };
}

export default Admin;