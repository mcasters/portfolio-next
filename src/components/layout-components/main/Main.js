import PropTypes from 'prop-types';

import s from './Main.module.css';
import LAYOUT from '../../../constants/layout';
import useViewport from '../../hooks/useWindowSize';

function Main({ isHome, headerIsFix, children }) {
  const { innerWidth, innerHeight } = useViewport();

  return isHome ? (
    <main
      className={s.mainHome}
      style={{
        backgroundImage:
          innerWidth / innerHeight < 1
            ? LAYOUT.BACKGROUND_IMAGE_MOBILE
            : LAYOUT.BACKGROUND_IMAGE_DESKTOP,
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
