/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Router from 'next/router';
import getConfig from "next/config";
import useSWR from 'swr';

import s from './styles/admin.module.css';
import ItemConstant from '../constants/itemConstant';
import TITLE from '../constants/pageTitle';
import CONTENT from '../constants/content';
import EditContent from '../components/administration/edit-content/EditContent';
import AdminItemParent from '../components/administration/items/admin-item-parent/AdminItemParent';
import EditPictureForm from '../components/administration/edit-picture/EditPictureForm';
import Layout from '../components/layout-components/layout/Layout';
import { ROUTES } from '../constants/router';
import { useAlert } from '../components/alert-context/AlertContext';
import { queryGraphql } from './api/graphql';
import { VIEWER } from '../data/graphql/api/queries';
import {
  signoutRequest,
  viewerRequest,
} from '../data/graphql/api/query-graphql';

const Admin = ({ isAuthenticated }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const triggerAlert = useAlert();
  const { publicRuntimeConfig } = getConfig();
  const { ls_key } = publicRuntimeConfig;

  const { mutate } = useSWR(VIEWER, viewerRequest);

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
          <button
            type="button"
            className="button"
            onClick={() => {
              localStorage.removeItem(ls_key);
              signoutRequest().then(() => {
                mutate();
                triggerAlert('Déconnecté', false);
                Router.replace(ROUTES.HOME);
              });
            }}
          >
            Déconnexion
          </button>
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
                  isTextArea
                />
                <EditContent
                  keyContent={CONTENT.KEY.HOME2}
                  isTextArea
                />
                <EditContent
                  keyContent={CONTENT.KEY.HOME3}
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
                  isTextArea
                />
              </div>
            </TabPanel>
            <TabPanel>
              <AdminItemParent
                type={ItemConstant.PAINTING.TYPE}
              />
            </TabPanel>
            <TabPanel>
              <AdminItemParent
                type={ItemConstant.SCULPTURE.TYPE}
              />
            </TabPanel>
            <TabPanel>
              <AdminItemParent
                type={ItemConstant.DRAWING.TYPE}
              />
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
  return <p>loading...</p>;
};

export async function getServerSideProps() {
  const isAuthenticated = await queryGraphql(`
  query ViewerQuery {
    viewer
  }
`);
  return {
    props: {
      isAuthenticated,
    },
  };
}

export default Admin;
