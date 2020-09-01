import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import CONST from '../constants/itemConstant';
import ItemTab from '../components/item-dir/item-tab/ItemTab';
import useOnSrr from '../components/hooks/useOnSrr';
import Layout from '../components/layout-components/layout/Layout';
import { queryGraphql } from '../data/graphql/api/server-side/query-graphql-ssr';
import { ITEMS_BY_PART } from '../data/graphql/api/queries';

const Peintures = ({ data2017, data2018_a, data2018_b, data2019 }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const onSsr = useOnSrr();

  const year2017 = CONST.PAINTING.YEAR2017;
  const year2018 = CONST.PAINTING.YEAR2018;
  const year2019 = CONST.PAINTING.YEAR2019;
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
          <Tab>{year2017.toString()}</Tab>
          <Tab>{year2018.toString()} a</Tab>
          <Tab>{year2018.toString()} b</Tab>
          <Tab>{year2019.toString()}</Tab>
        </TabList>
        {onSsr ? (
          <>
            <TabPanel>
              <ItemTab year={year2017} type={type} data={data2017} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2018} type={type} data={data2018_a} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2018} type={type} data={data2018_b} />
            </TabPanel>
            <TabPanel>
              <ItemTab year={year2019} type={type} data={data2019} />
            </TabPanel>
          </>
        ) : (
          <>
            <TabPanel>
              {selectedTab === 0 && (
                <ItemTab year={year2017} type={type} data={data2017} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 1 && (
                <ItemTab year={year2018} type={type} data={data2018_a} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 2 && (
                <ItemTab year={year2018} type={type} data={data2018_b} />
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 3 && (
                <ItemTab year={year2019} type={type} data={data2019} />
              )}
            </TabPanel>
          </>
        )}
      </Tabs>
    </Layout>
  );
};

export async function getServerSideProps() {
  const type = CONST.PAINTING.TYPE;
  const data2017 = await queryGraphql(ITEMS_BY_PART, {
    year: CONST.PAINTING.YEAR2017,
    type,
    part: 0,
  });
  const data2018_a = await queryGraphql(ITEMS_BY_PART, {
    year: CONST.PAINTING.YEAR2018,
    type,
    part: 1,
  });
  const data2018_b = await queryGraphql(ITEMS_BY_PART, {
    year: CONST.PAINTING.YEAR2018,
    type,
    part: 2,
  });
  const data2019 = await queryGraphql(ITEMS_BY_PART, {
    year: CONST.PAINTING.YEAR2019,
    type,
    part: 0,
  });
  return {
    props: {
      data2017,
      data2018_a,
      data2018_b,
      data2019,
    },
  };
}

export default Peintures;
