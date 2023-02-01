import React from 'react';
import PropTypes from 'prop-types';

import s from './Main.module.css';
import LAYOUT from '../../../constants/layout';

function Main({ isHome, height, isLessThanMD, headerIsFix, children }) {
  const style = {
    height,
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: isLessThanMD ? LAYOUT.BACKGROUND_IMAGE_MOBILE : LAYOUT.BACKGROUND_IMAGE_DESKTOP,
  };

  return isHome ? (
    <main className={headerIsFix ? `${s.mainHome} ${s.sticky}` : `${s.mainHome}`} style={style}>
      {children}
    </main>
  ) : (
    <main className={s.main}>{children}</main>
  );
}

Main.propTypes = {
  isHome: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  isLessThanMD: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Main;
