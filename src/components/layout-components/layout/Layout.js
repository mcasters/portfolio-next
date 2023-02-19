import PropTypes from 'prop-types';
import { useRouter, withRouter } from 'next/router';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import { ROUTES } from '../../../constants/routes';
import s from './Layout.module.css';
import useElementIsUpTo from '../../hooks/useElementIsUpTo';
import LAYOUT from '../../../constants/layout';
import { useCallback, useState } from 'react';

const Layout = ({ children, introduction }) => {
  const [headerIsFix, setHeaderIsFix] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === ROUTES.HOME;

  const handler = (isFix) => setHeaderIsFix(isFix);

  return (
    <>
      <div className={s.line}></div>
      <Header
        handler={handler}
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
