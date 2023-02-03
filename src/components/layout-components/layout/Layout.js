import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import LAYOUT from '../../../constants/layout';
import Main from '../main/Main';
import useViewport from '../../hooks/useViewport';
import { ROUTES } from '../../../constants/routes';
import s from './Layout.module.css';
import useElementIsUpTo from '../../hooks/useElementIsUpTo';

const Layout = ({ router, children, introduction }) => {
  const { windowWidth, windowHeight } = useViewport();
  const [isLessThanMD, setIsLessThanMD] = useState(true);
  const [headerIsFix, headerRef] = useElementIsUpTo(91);
  const isHome = router.pathname === ROUTES.HOME;

  useEffect(() => {
    setIsLessThanMD(windowWidth < LAYOUT.BREAKPOINT.MD);
  }, [windowWidth]);

  return (
    <>
      <div
        className={s.line}
      ></div>
      <Header
        headerRef={headerRef}
        isHome={isHome}
        introduction={introduction}
      />
      <Main
        isHome={isHome}
        height={windowHeight}
        isLessThanMD={isLessThanMD}
        headerIsFix={headerIsFix}
      >
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
