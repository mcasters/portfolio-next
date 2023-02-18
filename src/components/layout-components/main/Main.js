import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import s from './Main.module.css';
import LAYOUT from '../../../constants/layout';
import useViewport from '../../hooks/useViewport';

function Main({ isHome, headerIsFix, children }) {
  const { innerWidth, innerHeight } = useViewport();
  const getHomeStyle = () => {
    return {
      height: innerHeight,
      backgroundImage:
        innerWidth / innerHeight < 1
          ? LAYOUT.BACKGROUND_IMAGE_MOBILE
          : LAYOUT.BACKGROUND_IMAGE_DESKTOP,
    };
  };
  const [homeStyle, setHomeStyle] = useState(getHomeStyle);

  useEffect(() => {
    setHomeStyle(getHomeStyle());
  }, [innerWidth, innerHeight]);

  return isHome ? (
    <main
      className={s.mainHome}
      style={{
        ...homeStyle,
        marginTop: headerIsFix ? `${LAYOUT.NAV_2_HEIGHT}px` : undefined,
      }}
    >
      {children}
    </main>
  ) : (
    <main
      className={s.main}
      style={{
        width: `${LAYOUT.MAIN_WIDTH_MOBILE_VW}vw`,
        maxWidth: `${LAYOUT.MAIN_WIDTH_PX}px`,
      }}
    >
      {children}
    </main>
  );
}

Main.propTypes = {
  isHome: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  headerIsFix: PropTypes.bool.isRequired,
};

export default Main;
