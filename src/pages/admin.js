/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useRef } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useRouter } from 'next/router';
import Link from 'next/link';

import s from './styles/admin.module.css';
import ItemConstant from '../constants/itemConstant';
import TITLE from '../constants/pageTitle';
import CONTENT from '../constants/content';
import EditContent from '../components/admin/edit-content/EditContent';
import AdminItemParent from '../components/admin/item/admin-item-parent/AdminItemParent';
import EditPictureForm from '../components/admin/edit-picture/EditPictureForm';
import Layout from '../components/layout-components/layout/Layout';
import { ROUTES } from '../constants/router';
import { getAllItems, getContent, viewer } from '../data/api/api';
import { useAlert } from '../components/alert-context/AlertContext';

const Admin = ({ isAuthenticated, allContent }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const triggerAlert = useAlert();

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      triggerAlert('Authentification recquise', true);
      router.push(ROUTES.SIGNIN);
    }
  });

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('indexAdminTab') !== null
    )
      setSelectedTab(parseInt(localStorage.getItem('indexAdminTab')));
  }, []);

  const handleSelectTab = (index) => {
    localStorage.setItem('indexAdminTab', index);
    setSelectedTab(index);
  };

  if (isAuthenticated) {
    return (
      <Layout>
        <div className={s.container}>
          <h1 className={s.title}>{TITLE.ADMINISTRATION}</h1>
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
  }
  return <p>Loading...</p>;
};

export async function getServerSideProps(context) {
  const isAuthenticated = await viewer(context);
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
