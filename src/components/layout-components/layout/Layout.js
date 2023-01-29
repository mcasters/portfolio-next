import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import LAYOUT from '../../../constants/layout';
import Main from '../main/Main';
import useViewport from '../../hooks/useViewport';
import { ROUTES } from '../../../constants/routes';
import s from "../Layout/Layout.module.css";

const Layout = ({ router, children, introduction }) => {
  const { windowWidth, windowHeight } = useViewport();
  const [isLessThanMD, setIsLessThanMD] = useState(true);
  const [mainHeight, setMainHeight] = useState(500);
  const isHome = router.pathname === ROUTES.HOME;

  useEffect(() => {
    setIsLessThanMD(windowWidth < LAYOUT.BREAKPOINT.MD);
  }, [windowWidth]);

  useEffect(() => {
    setMainHeight(
      isLessThanMD ? windowHeight - LAYOUT.MOBILE_HEADER_HEIGHT : windowHeight,
    );
  }, [isLessThanMD]);

  return (
    <>
      <div className={s.line}></div>
      <Header isHome={isHome} introduction={introduction} />
      <Main isHome={isHome} height={mainHeight} isLessThanMD={isLessThanMD}>
        {children}
      </Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  introduction: PropTypes.string,
};

export default withRouter(Layout);
