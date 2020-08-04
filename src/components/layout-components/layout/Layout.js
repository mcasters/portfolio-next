import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import LAYOUT from '../../../constants/layout';
import Main from '../main/Main';
import useViewport from '../../hooks/useViewport';
import MobileNav from '../navigation/mobile-nav/MobileNav';
import DesktopNav from '../navigation/desktop-nav/DesktopNav';

export default function Layout({ children }) {
  const { windowWidth, windowHeight } = useViewport();
  const [isLessThanMD, setIsLessThanMD] = useState(true);
  const [mainHeight, setMainHeight] = useState(500);
  const router = useRouter();

  const isHome = router.pathname === '/';

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
      <Header isHome={isHome} />
      {isLessThanMD && <MobileNav />}
      {!isLessThanMD && <DesktopNav isHome={isHome} />}
      <Main isHome={isHome} height={mainHeight}>
        {children}
      </Main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
