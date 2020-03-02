/* eslint-disable css-modules/no-unused-class */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import './Layout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import LAYOUT_CONSTANTS from '../../../constants/layoutConstants';
import ErrorBoundary from '../../ErrorBoundary';
import Main from '../Main/Main';
import useViewport from '../../Hooks/useViewport';

function Layout({ children }) {
  const { windowWidth, windowHeight } = useViewport();
  const [headerHeight, setHeaderHeight] = useState(0);
  const router = useRouter();

  const isHome = router.pathname === '/' || router.pathname === '/home';
  const isLessThanMD = windowWidth < LAYOUT_CONSTANTS.BREAKPOINT.MD;

  const getHeight = h => setHeaderHeight(h);

  const getMainHeight = () => {
    return isLessThanMD ? windowHeight - headerHeight : windowHeight;
  };

  return (
    <>
      <ErrorBoundary>
        <Header isHome={isHome} onHeight={getHeight} />
        <Navigation isLessThanMD={isLessThanMD} isHome={isHome} />

        <Main isHome={isHome} height={getMainHeight()}>
          {children}
        </Main>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
