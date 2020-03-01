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
import useOnSrr from '../../Hooks/useOnSrr';

function Layout({ children }) {
  const { windowWidth, windowHeight } = useViewport();
  const onSsr = useOnSrr();
  const [headerHeight, setHeaderHeight] = useState(0);
  const router = useRouter();

  const isHome = router.pathname === '/' || router.pathname === '/home';
  const isLessThanMD = windowWidth < LAYOUT_CONSTANTS.BREAKPOINT.MD;

  const getHeight = h => setHeaderHeight(h);

  const getMainHeight = () => {
    if (onSsr) {
      return 640;
    }
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
        {typeof window === 'undefined' && <div>window undefined</div>}
        {typeof window !== 'undefined' && <div>window not undefined</div>}
        {typeof window !== 'undefined' && window.document && (
          <div>document</div>
        )}
        {typeof window !== 'undefined' &&
          window.document &&
          window.document.createElement && <div>document.createElement</div>}
        {onSsr && <div>ON SSR</div>}
        <Footer />
      </ErrorBoundary>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
