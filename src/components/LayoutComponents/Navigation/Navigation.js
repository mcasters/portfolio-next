import React from 'react';
import PropTypes from 'prop-types';

import DesktopNav from './DesktopNav/DesktopNav';
import CustomMobileNav from './CustomMobileNav/CustomMobileNav';

function Navigation({ isLessThanMD, isHome }) {
  return isLessThanMD ? <CustomMobileNav /> : <DesktopNav isHome={isHome} />;
}

Navigation.propTypes = {
  isLessThanMD: PropTypes.bool.isRequired,
  isHome: PropTypes.bool,
};

Navigation.defaultProps = {
  isHome: false,
};

export default Navigation;
