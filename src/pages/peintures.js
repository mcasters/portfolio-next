import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import CONST from '../constants/itemConstant';
import ItemTab from '../components/item-dir/item-tab/ItemTab';
import useOnSrr from '../components/hooks/useOnSrr';
import Layout from '../components/layout-components/layout/Layout';

const Peintures = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const onSsr = useOnSrr();

  const year1 = CONST.PAINTING.YEAR1;
  const year2 = CONST.PAINTING.YEAR2;
  const year3 = CONST.PAINTING.YEAR3;
  const type = CONST.PAINTING.TYPE;

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('indexTab') !== null
    )
      setSelectedTab(parseInt(localStorage.getItem('indexTab')));
  }, []);

  const scrollTop = () => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };

  const handleSelectTab = (index) => {
    if (typeof window !== 'undefined') localStorage.setItem('indexTab', index);
    setSelectedTab(index);
    scrollTop();
  };

  return (
    <Layout>
      <h1 className="hidden">{CONST.PAINTING.TITLE}</h1>
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
              <ItemTab year={year1} type={type} part={0} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2} type={type} part={1} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2} type={type} part={2} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year3} type={type} part={0} />
            </TabPanel>
          </>
        ) : (
          <>
            <TabPanel>
              {selectedTab === 0 && (
                <ItemTab year={year1} type={type} part={0} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 1 && (
                <ItemTab year={year2} type={type} part={1} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 2 && (
                <ItemTab year={year2} type={type} part={2} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 3 && (
                <ItemTab year={year3} type={type} part={0} />
              )}
            </TabPanel>
          </>
        )}
      </Tabs>
    </Layout>
  );
};

export default Peintures;
