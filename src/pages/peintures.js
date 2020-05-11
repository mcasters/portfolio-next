import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import ITEM from '../constants/itemConstant';
import ItemTab from '../components/ItemDir/ItemTab';
import useOnSrr from '../components/Hooks/useOnSrr';
import Layout from '../components/LayoutComponents/Layout/Layout';
import { getItemsByPart } from '../data/lib/api';

const Peintures = ({ items2017, items2018_1, items2018_2, items2019 }) => {
  const title = 'Peintures';
  const [selectedTab, setSelectedTab] = useState(0);
  const onSsr = useOnSrr();

  const year1 = ITEM.PAINTING.YEAR1;
  const year2 = ITEM.PAINTING.YEAR2;
  const year3 = ITEM.PAINTING.YEAR3;
  const type = ITEM.PAINTING.TYPE;

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
    if (typeof window !== 'undefined')
    localStorage.setItem('indexTab', index);
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
              <ItemTab year={year1} type={type} items={items2017} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2} type={type} items={items2018_1} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2} type={type} items={items2018_2} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year3} type={type} items={items2019} />
            </TabPanel>
          </>
        ) : (
          <>
            <TabPanel>
              {selectedTab === 0 && (
                <ItemTab year={year1} type={type} items={items2017} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 1 && (
                <ItemTab year={year2} type={type} items={items2018_1} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 2 && (
                <ItemTab year={year2} type={type} items={items2018_2} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 3 && (
                <ItemTab year={year3} type={type} items={items2019} />
              )}
            </TabPanel>
          </>
        )}
      </Tabs>
    </Layout>
  );
};

export async function getServerSideProps() {
  const items2017 = await getItemsByPart(ITEM.PAINTING.YEAR1, ITEM.PAINTING.TYPE, 0);
  const items2018_1 = await getItemsByPart(ITEM.PAINTING.YEAR2, ITEM.PAINTING.TYPE, 1);
  const items2018_2 = await getItemsByPart(ITEM.PAINTING.YEAR2, ITEM.PAINTING.TYPE, 2);
  const items2019 = await getItemsByPart(ITEM.PAINTING.YEAR3, ITEM.PAINTING.TYPE, 0);
  return {
    props: { items2017, items2018_1, items2018_2, items2019 },
  };
}

export default Peintures;
