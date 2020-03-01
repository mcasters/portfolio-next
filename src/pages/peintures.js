import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import ITEM from '../constants/item';
import ItemTab from '../components/ItemDir/ItemTab';
import useOnSrr from '../components/Hooks/useOnSrr';
import { withApollo } from '../data/client';
import Layout from '../components/LayoutComponents/Layout/Layout';

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
      <style jsx global>{`
        .react-tabs {
          -webkit-tap-highlight-color: transparent;
        }
        
        .react-tabs__tab-list {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          background-color: #eee;
          border-bottom: 1px solid #aaa;
          margin: 0 0 30px;
          padding: 0;
        }

        .react-tabs__tab {
          display: inline-block;
          font-size: 14px;
          border: 1px solid transparent;
          border-bottom: none;
          bottom: -1px;
          position: relative;
          list-style: none;
          padding: 6px 12px;
          cursor: pointer;
        }

        .react-tabs__tab--selected {
          background: #fff;
          border-color: #aaa;
          color: black;
          border-radius: 5px 5px 0 0;
        }

        .react-tabs__tab--disabled {
          color: GrayText;
          cursor: default;
        }

        .react-tabs__tab:focus {
          box-shadow: 0 0 5px hsl(208, 99%, 50%);
          border-color: hsl(208, 99%, 50%);
          outline: none;
        }

        .react-tabs__tab:focus::after {
          content: '';
          position: absolute;
          height: 5px;
          left: -4px;
          right: -4px;
          bottom: -5px;
          background: #fff;
        }

        .react-tabs__tab-panel {
          display: none;
        }

        .react-tabs__tab-panel--selected {
          display: block;
        }
      `}</style>
    </Layout>
  );
}

export default withApollo(Peintures);
