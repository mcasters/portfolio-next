import PropTypes from 'prop-types';

import s from './Header.module.css';
import GLOB_CONST from '../../../constants/globalConstants';
import Content from '../../content/Content';
import useElementIsUpTo from '../../hooks/useElementIsUpTo';
import Nav_1 from './navigation/Nav_1';
import Nav_2 from './navigation/Nav_2';
import LAYOUT from '../../../constants/layout';
import { useEffect } from 'react';

function Header({ isHome, introduction, handler }) {
  const [titleDisappear, titleRef] = useElementIsUpTo(LAYOUT.RED_LINE_HEIGHT);
  const [introDisappear, introRef] = useElementIsUpTo(
    LAYOUT.NAV_1_HEIGHT + LAYOUT.RED_LINE_HEIGHT,
  );

  useEffect(() => {
    handler(introDisappear);
  }, [introDisappear, handler]);

  return (
    <header className={s.container}>
      {isHome && (
        <h1 ref={titleRef} className={s.title}>
          {GLOB_CONST.SITE_TITLE}
        </h1>
      )}
      <Nav_1 titleDisappear={isHome ? titleDisappear : true} />
      <div
        style={{
          display: titleDisappear ? 'block' : 'none',
          height: LAYOUT.NAV_1_HEIGHT,
        }}
      />
      {isHome && (
        <div ref={introRef} className={s.intro}>
          {introduction && <Content text={introduction} />}
        </div>
      )}
      <Nav_2 isHome={isHome} introDisappear={isHome ? introDisappear : true} />
      <div
        style={{
          display: introDisappear ? 'block' : 'none',
          height: LAYOUT.NAV_2_HEIGHT,
        }}
      />
    </header>
  );
}

Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
  introduction: PropTypes.string,
  handler: PropTypes.func.isRequired,
};
export default Header;
