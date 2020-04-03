import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import LAYOUT from '../../../constants/layout';
import ROUTER from '../../../constants/router';
import Main from '../Main/Main';
import useViewport from '../../Hooks/useViewport';

export default function Layout({ children }) {
  const { windowWidth, windowHeight } = useViewport();
  const [isLessThanMD, setIsLessThanMD] = useState(true);
  const [mainHeight, setMainHeight] = useState(500);
  const router = useRouter();

  const isHome = router.pathname === ROUTER.HOME;

  useEffect(() => {
    if (typeof window != 'undefined') {
      setIsLessThanMD(windowWidth < LAYOUT.BREAKPOINT.MD);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (typeof window != 'undefined') {
      setMainHeight(
        isLessThanMD
          ? windowHeight - LAYOUT.MOBILE_HEADER_HEIGHT
          : windowHeight,
      );
    }
  }, [isLessThanMD]);

  return (
    <>
      <Header isHome={isHome} />
      <Navigation isLessThanMD={isLessThanMD} isHome={isHome} />
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
