import React from "react";

import Content from '../components/Content/Content';
import CONTENT_CONST from '../constants/content';
import TITLE from '../constants/pageTitle';
import s from './styles/index.module.css';
import Layout from "../components/LayoutComponents/Layout/Layout";

function Home() {
  return (
    <Layout>
      <div className={s.container}>
        <h1 className="hidden">{TITLE.HOME}</h1>
        <div className={s.content}>
          <Content keyContent={CONTENT_CONST.KEY.HOME3} />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
