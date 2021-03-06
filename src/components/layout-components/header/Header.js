import React from 'react';
import PropTypes from 'prop-types';

import s from './Header.module.css';
import GLOB_CONST from '../../../constants/globalConstants';
import useScroll from '../../hooks/useScroll';

function Header({ isHome }) {
  const scrollY = useScroll();
  const title = GLOB_CONST.SITE_TITLE;

  return isHome ? (
    <header className={s.homeContainer}>
      <h1>{title}</h1>
    </header>
  ) : (
    <header
      className={scrollY > 0 ? `${s.container} ${s.sticky}` : `${s.container}`}
    >
      <h1>{title}</h1>
    </header>
  );
}

Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
};
export default Header;
