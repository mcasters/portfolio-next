import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import s from './admin.module.css';
import ITEM from '../constants/item';
import TITLE from '../constants/pageTitle';
import CONTENT from '../constants/content';
import EditContent from '../components/Admin/EditContent/EditContent';
import Logout from '../components/Logout/Logout';
import AdminItemParent from '../components/Admin/Item/AdminItemParent/AdminItemParent';
import EditPictureForm from '../components/Admin/EditPicture/EditPictureForm';
import ViewerQuery from '../data/graphql/queries/viewer';
import { withApollo } from '../data/client';
import Layout from '../components/LayoutComponents/Layout/Layout';
import ROUTER from "../constants/router";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data, loading } = useQuery(ViewerQuery);
  const router = useRouter();

  if (
    loading === false &&
    data.viewer === null &&
    typeof window !== 'undefined'
  )
    router.push(ROUTER.HOME);

  const handleSelectTab = index => {
    setSelectedTab(index);
  };

  if (data && data.viewer) {
    return (
      <Layout>
        <div className={s.container}>
          <h1 className={s.title}>{TITLE.ADMINISTRATION}</h1>
          <Logout />
          <Tabs
            selectedIndex={selectedTab}
            onSelect={handleSelectTab}
            className={s.tabs}
            forceRenderTabPanel
          >
            <TabList>
              <Tab>{TITLE.HOME}</Tab>
              <Tab>{TITLE.PRESENTATION}</Tab>
              <Tab>{ITEM.PAINTING.TITLE}</Tab>
              <Tab>{ITEM.SCULPTURE.TITLE}</Tab>
              <Tab>{ITEM.DRAWING.TITLE}</Tab>
              <Tab>{TITLE.CONTACT}</Tab>
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
              <AdminItemParent type={ITEM.PAINTING.TYPE} />
            </TabPanel>
            <TabPanel>
              <AdminItemParent type={ITEM.SCULPTURE.TYPE} />
            </TabPanel>
            <TabPanel>
              <AdminItemParent type={ITEM.DRAWING.TYPE} />
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
  }

  return <p>Loading...</p>;
};

export default withApollo(Admin);
