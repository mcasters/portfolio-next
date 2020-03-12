import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Header.module.css';
import GLOB_CONST from '../../../constants/globalConstants';
import useHeight from '../../Hooks/useHeight';
import useScroll from '../../Hooks/useScroll';

function Header({ isHome, onHeight }) {
  const [height, ref] = useHeight();
  const scrollY = useScroll();
  const title = GLOB_CONST.SITE_TITLE;

  useEffect(() => {
    onHeight(height);
  }, []);

  return isHome ? (
    <header>
      <div ref={ref} className={s.homeContainer}>
        <h1>{title}</h1>
      </div>
    </header>
  ) : (
    <header>
      <div
        className={
          scrollY > 0 ? `${s.container} ${s.sticky}` : `${s.container}`
        }
      >
        <h1>{title}</h1>
      </div>
    </header>
  );
}

Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
  onHeight: PropTypes.func.isRequired,
};
export default Header;
