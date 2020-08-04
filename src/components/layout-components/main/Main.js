import React from 'react';
import PropTypes from 'prop-types';

import s from './Main.module.css';

function Main({ isHome, height, children }) {
  return isHome ? (
    <main className={s.mainHome} style={{ height }}>
      {children}
    </main>
  ) : (
    <main className={s.main}>{children}</main>
  );
}

Main.propTypes = {
  isHome: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Main;
