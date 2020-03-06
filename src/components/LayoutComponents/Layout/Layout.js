import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import LAYOUT_CONSTANTS from '../../../constants/layoutConstants';
import ROUTER_CONSTANTS from '../../../constants/router';
import Main from '../Main/Main';
import useViewport from '../../Hooks/useViewport';

export default function Layout({ children }) {
  const { windowWidth, windowHeight } = useViewport();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLessThanMD, setIsLessThanMD] = useState(true);
  const [mainHeight, setMainHeight] = useState(500);
  const router = useRouter();

  const isHome = router.pathname === ROUTER_CONSTANTS.HOME;

  const getHeight = h => setHeaderHeight(h);

  useEffect(() => {
    if (typeof window != 'undefined') {
      setIsLessThanMD(windowWidth < LAYOUT_CONSTANTS.BREAKPOINT.MD);
      setMainHeight(isLessThanMD ? windowHeight - headerHeight : windowHeight);
    }
  }, [windowWidth, windowHeight, headerHeight]);

  return (
    <>
      <Header isHome={isHome} onHeight={getHeight} />
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
