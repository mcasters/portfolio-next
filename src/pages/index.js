import React from "react";

import Content from '../components/Content/Content';
import CONTENT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './index.module.css';
import Layout from "../components/LayoutComponents/Layout/Layout";

function Home() {
  return (
    <Layout>
      <div className={s.homeContainer}>
        <h1 className="hidden">{TITLE.HOME}</h1>
        <div className={s.homeContent}>
          <Content keyContent={CONTENT_CONST.KEY.HOME3} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
