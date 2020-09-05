import React from 'react';
import PropTypes from 'prop-types';

import s from './Main.module.css';
import LAYOUT_CONST from "../../../constants/layout";

function Main({ isHome, height, isLessThanMD, children }) {
  const commonStyle = {
    height,
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
  const homeStyle = isLessThanMD
    ? {
        ...commonStyle,
        backgroundImage: LAYOUT_CONST.BACKGROUND_IMAGE_MOBILE,
      }
    : {
        ...commonStyle,
        backgroundImage: LAYOUT_CONST.BACKGROUND_IMAGE_DESKTOP,
      };

  return isHome ? (
    <main className={s.mainHome} style={homeStyle}>
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
