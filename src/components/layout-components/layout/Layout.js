import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import LAYOUT from '../../../constants/layout';
import Main from '../main/Main';
import useViewport from '../../hooks/useViewport';
import MobileNav from '../navigation/mobile-nav/MobileNav';
import DesktopNav from '../navigation/desktop-nav/DesktopNav';
import { ROUTES } from '../../../constants/routes';

const Layout = ({ router, children }) => {
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
      <Header isHome={isHome} />
      {isLessThanMD && <MobileNav />}
      {!isLessThanMD && <DesktopNav isHome={isHome} />}
      <Main isHome={isHome} height={mainHeight} isLessThanMD={isLessThanMD}>
        {children}
      </Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(Layout);
