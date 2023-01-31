import PropTypes from 'prop-types';

import s from './Header.module.css';
import GLOB_CONST from '../../../constants/globalConstants';
import Content from '../../content/Content';
import useElementIsUpTo from '../../hooks/useElementIsUpTo';
import Nav_1 from '../navigation/Nav_1';
import Nav_2 from '../navigation/Nav_2';

function Header({ isHome, introduction }) {
  const [titleDisappear, titleRef] = useElementIsUpTo(8);
  const [introDisappear, introRef] = useElementIsUpTo(38);

  return (
    <header className={s.container}>
      {isHome && (
        <h1 ref={titleRef} className={s.title}>
          {GLOB_CONST.SITE_TITLE}
        </h1>
      )}
      <Nav_1 titleDisappear={isHome ? titleDisappear : true} />
      {isHome && (
        <div
          ref={introRef}
          className={
            titleDisappear ? `${s.intro} ${s.introSticky}` : `${s.intro}`
          }
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
