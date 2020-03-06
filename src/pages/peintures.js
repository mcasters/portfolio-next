import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import ITEM from '../constants/item';
import ItemTab from '../components/ItemDir/ItemTab';
import useOnSrr from '../components/Hooks/useOnSrr';
import { withApollo } from '../data/client';
import Layout from "../components/LayoutComponents/Layout/Layout";

function Peintures() {
  const title = 'Peintures';
  const [selectedTab, setSelectedTab] = useState(0);
  const onSsr = useOnSrr();

  const year1 = 2017;
  const year2 = 2018;
  const year3 = 2019;
  const type = ITEM.PAINTING.TYPE;

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSelectTab = index => {
    setSelectedTab(index);
    scrollTop();
  };

  return (
    <Layout>
      <h1 className="hidden">{title}</h1>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={handleSelectTab}
        forceRenderTabPanel
      >
        <TabList>
          <Tab>{year1.toString()}</Tab>
          <Tab>{year2.toString()} a</Tab>
          <Tab>{year2.toString()} b</Tab>
          <Tab>{year3.toString()}</Tab>
        </TabList>
        {onSsr ? (
          <>
            <TabPanel>
              <ItemTab year={year1} half={0} type={type} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2} half={1} type={type} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2} half={2} type={type} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year3} half={0} type={type} />
            </TabPanel>
          </>
        ) : (
          <>
            <TabPanel>
              {selectedTab === 0 && (
                <ItemTab year={year1} half={0} type={type} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 1 && (
                <ItemTab year={year2} half={1} type={type} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 2 && (
                <ItemTab year={year2} half={2} type={type} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 3 && (
                <ItemTab year={year3} half={0} type={type} />
              )}
            </TabPanel>
          </>
        )}
      </Tabs>
    </Layout>
  );
}

export default withApollo(Peintures);
