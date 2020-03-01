import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import ITEM from '../constants/item';
import ItemTab from '../components/ItemDir/ItemTab';
import useOnSrr from '../components/Hooks/useOnSrr';
import { withApollo } from '../data/client';

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
    <>
      <h1>{title}</h1>
      <Tabs
          className="tabs"
        selectedIndex={selectedTab}
        onSelect={handleSelectTab}
        forceRenderTabPanel
      >
        <TabList className="tab-list">
          <Tab className="tab">{year1.toString()}</Tab>
          <Tab className="tab">{year2.toString()} a</Tab>
          <Tab className="tab">{year2.toString()} b</Tab>
          <Tab className="tab">{year3.toString()}</Tab>
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
      <style jsx>{`
        .tabs {
          -webkit-tap-highlight-color: transparent;
        }

        .tab-list {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          background-color: #eee;
          border-bottom: 1px solid #aaa;
          margin: 0 0 30px;
          padding: 0;
        }

        .tab {
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

        .tab--selected {
          background: #fff;
          border-color: #aaa;
          color: black;
          border-radius: 5px 5px 0 0;
        }

        .tab--disabled {
          color: GrayText;
          cursor: default;
        }

        .tab:focus {
          box-shadow: 0 0 5px hsl(208, 99%, 50%);
          border-color: hsl(208, 99%, 50%);
          outline: none;
        }

        .tab:focus::after {
          content: '';
          position: absolute;
          height: 5px;
          left: -4px;
          right: -4px;
          bottom: -5px;
          background: #fff;
        }

        .tab-panel {
          display: none;
        }

        .tab-panel--selected {
          display: block;
        }
      `}</style>
    </>
  );
}

export default withApollo(Peintures);
