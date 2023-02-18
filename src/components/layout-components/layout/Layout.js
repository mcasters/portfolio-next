import PropTypes from 'prop-types';
import { useRouter, withRouter } from 'next/router';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import { ROUTES } from '../../../constants/routes';
import s from './Layout.module.css';
import useElementIsUpTo from '../../hooks/useElementIsUpTo';
import LAYOUT from '../../../constants/layout';

const Layout = ({ children, introduction }) => {
  const [headerIsFix, headerRef] = useElementIsUpTo(
    LAYOUT.RED_LINE_HEIGHT + LAYOUT.NAV_1_HEIGHT + LAYOUT.NAV_2_HEIGHT,
  );
  const router = useRouter();
  const isHome = router.pathname === ROUTES.HOME;

  return (
    <>
      <div className={s.line}></div>
      <Header
        headerRef={headerRef}
        isHome={isHome}
        introduction={introduction}
      />
      <Main isHome={isHome} headerIsFix={headerIsFix}>
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
