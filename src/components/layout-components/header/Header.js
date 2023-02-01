import PropTypes from 'prop-types';

import s from './Header.module.css';
import GLOB_CONST from '../../../constants/globalConstants';
import Content from '../../content/Content';
import useElementIsUpTo from '../../hooks/useElementIsUpTo';
import Nav_1 from './navigation/Nav_1';
import Nav_2 from './navigation/Nav_2';
import LAYOUT from '../../../constants/layout';

function Header({ isHome, introduction, headerRef }) {
  const [titleDisappear, titleRef] = useElementIsUpTo(LAYOUT.RED_LINE_HEIGHT);
  const [introDisappear, introRef] = useElementIsUpTo(LAYOUT.NAV_1_HEIGHT + LAYOUT.RED_LINE_HEIGHT);

  return (
    <header className={s.container} ref={headerRef}>
      {isHome && (
        <h1 ref={titleRef} className={s.title}>
          {GLOB_CONST.SITE_TITLE}
        </h1>
      )}
      <Nav_1 titleDisappear={isHome ? titleDisappear : true} />
      {isHome && (
        <div
          ref={introRef}
          className={titleDisappear ? `${s.intro} ${s.withMargin}` : s.intro}
        >
          {introduction && <Content text={introduction} />}
        </div>
      )}
      <Nav_2 introDisappear={isHome ? introDisappear : true} />
    </header>
  );
}

Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
  introduction: PropTypes.string,
};
export default Header;
