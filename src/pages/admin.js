/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Router from 'next/router';
import Link from 'next/link';

import s from './styles/admin.module.css';
import ItemConstant from '../constants/itemConstant';
import TITLE from '../constants/pageTitle';
import CONTENT from '../constants/content';
import EditContent from '../components/administration/edit-content/EditContent';
import AdminItemParent from '../components/administration/items/admin-item-parent/AdminItemParent';
import EditPictureForm from '../components/administration/edit-picture/EditPictureForm';
import Layout from '../components/layout-components/layout/Layout';
import { ROUTES } from '../constants/router';
import { getAllItems, getContent } from '../data/api/api';
import { useAlert } from '../components/alert-context/AlertContext';
import { queryGraphql } from './api/graphql';

const Admin = ({ isAuthenticated, allContent }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const triggerAlert = useAlert();

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      triggerAlert('Authentification recquise', true);
      Router.replace(ROUTES.SIGNIN);
    }
  });

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

  if (isAuthenticated)
    return (
      <Layout>
        <div className={s.container}>
          <h1 className={s.title}>{TITLE.ADMINISTRATION}</h1>
          {/*<button type="button" onClick={() => {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          triggerAlert('Déconnecté', false);
          mutate();
          Router.replace(ROUTES.HOME);
        }}>Déconnexion</button>*/}
          <Link href={ROUTES.SIGNOUT}>
            <a>Déconnexion</a>
          </Link>
          <Tabs
            selectedIndex={selectedTab}
            onSelect={handleSelectTab}
            className={s.tabs}
            forceRenderTabPanel
          >
            <TabList>
              <Tab>{TITLE.HOME}</Tab>
              <Tab>{TITLE.PRESENTATION}</Tab>
              <Tab>{ItemConstant.PAINTING.TITLE}</Tab>
              <Tab>{ItemConstant.SCULPTURE.TITLE}</Tab>
              <Tab>{ItemConstant.DRAWING.TITLE}</Tab>
              <Tab>{TITLE.CONTACT}</Tab>
            </TabList>
            <TabPanel>
              <div className={s.tabContainer}>
                <EditPictureForm pictureTitle={CONTENT.HOME_IMAGE_PORTRAIT} />
                <EditPictureForm pictureTitle={CONTENT.HOME_IMAGE_LANDSCAPE} />
                <EditContent
                  keyContent={CONTENT.KEY.HOME1}
                  content={allContent.homeContent1}
                  isTextArea
                />
                <EditContent
                  keyContent={CONTENT.KEY.HOME2}
                  content={allContent.homeContent2}
                  isTextArea
                />
                <EditContent
                  keyContent={CONTENT.KEY.HOME3}
                  content={allContent.homeContent3}
                  isTextArea
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className={s.tabContainer}>
                <EditPictureForm
                  pictureTitle={CONTENT.PRESENTATION_IMAGE_TITLE}
                />
                <EditContent
                  keyContent={CONTENT.KEY.PRESENTATION}
                  content={allContent.presentation}
                  isTextArea
                />
              </div>
            </TabPanel>
            <TabPanel>
              <AdminItemParent
                type={ItemConstant.PAINTING.TYPE}
                items={allContent.paintings}
              />
            </TabPanel>
            <TabPanel>
              <AdminItemParent
                type={ItemConstant.SCULPTURE.TYPE}
                items={allContent.sculptures}
              />
            </TabPanel>
            <TabPanel>
              <AdminItemParent
                type={ItemConstant.DRAWING.TYPE}
                items={allContent.drawings}
              />
            </TabPanel>
            <TabPanel>
              <div className={s.tabContainer}>
                <EditContent
                  keyContent={CONTENT.KEY.CONTACT_ADDRESS}
                  content={allContent.address}
                  isTextArea
                />
                <EditContent
                  keyContent={CONTENT.KEY.CONTACT_PHONE}
                  content={allContent.phone}
                  isTextArea={false}
                />
                <EditContent
                  keyContent={CONTENT.KEY.CONTACT_EMAIL}
                  content={allContent.email}
                  isTextArea={false}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </Layout>
    );
  return <p>loading...</p>;
};

export async function getServerSideProps() {
  const isAuthenticated = await queryGraphql(`
  query ViewerQuery {
    viewer
  }
`);
  const drawings = await getAllItems(ItemConstant.DRAWING.TYPE);
  const paintings = await getAllItems(ItemConstant.PAINTING.TYPE);
  const sculptures = await getAllItems(ItemConstant.SCULPTURE.TYPE);
  const homeContent1 = await getContent(CONTENT.KEY.HOME1);
  const homeContent2 = await getContent(CONTENT.KEY.HOME2);
  const homeContent3 = await getContent(CONTENT.KEY.HOME3);
  const presentation = await getContent(CONTENT.KEY.PRESENTATION);
  const address = await getContent(CONTENT.KEY.CONTACT_ADDRESS);
  const phone = await getContent(CONTENT.KEY.CONTACT_PHONE);
  const email = await getContent(CONTENT.KEY.CONTACT_EMAIL);

  return {
    props: {
      isAuthenticated,
      allContent: {
        drawings,
        paintings,
        sculptures,
        homeContent1,
        homeContent2,
        homeContent3,
        presentation,
        address,
        phone,
        email,
      },
    },
  };
}

export default Admin;
