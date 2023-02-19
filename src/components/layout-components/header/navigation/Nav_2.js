import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

import { MENU_2 } from '../../../../constants/routes';
import s from './Nav_2.module.css';
import logo from '../../../../../public/logo-100.png';

function Nav_2({ isHome, introDisappear }) {
  const style = {
    backgroundImage: "url('/assets/shadow.png')",
  };

  return (
    <nav
      className={
        introDisappear ? `${s.secondaryNav} ${s.sticky}` : `${s.secondaryNav}`
      }
    >
      <ul className={isHome ? `${s.menu} ${s.home}` : `${s.menu}`}>
        {MENU_2.map((menuItem) => {
          if (menuItem.NAME === 'Home')
            return (
              <li key={menuItem.NAME} className={s.liHome}>
                <Link
                  href={menuItem.PATH}
                  key={menuItem.NAME}
                  legacyBehavior={false}
                >
                  <Image
                    src={logo}
                    alt="Signature de Marion Casters"
                    width="70px"
                    height="70px"
                    quality={100}
                    unoptimized={true}
                    className={s.logo}
                  />
                </Link>
              </li>
            );
          return (
            <li key={menuItem.NAME}>
              <Link
                href={menuItem.PATH}
                key={menuItem.NAME}
                legacyBehavior={false}
                className={s.link}
              >
                {menuItem.NAME}
              </Link>
            </li>
          );
        })}
      </ul>
      {!isHome && <div className={s.shadow} style={style} />}
    </nav>
  );
}

Nav_2.propTypes = {
  isHome: PropTypes.bool.isRequired,
  introDisappear: PropTypes.bool.isRequired,
};

export default Nav_2;
