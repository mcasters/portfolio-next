import React from 'react';
import PropTypes from 'prop-types';

import s from './Header.module.css';
import GLOB_CONST from '../../../constants/globalConstants';
import useScroll from '../../hooks/useScroll';
import { useRouter } from 'next/router';
import { MENU_1, MENU_2 } from '../../../constants/routes';
import Link from 'next/link';

function Header({ isHome }) {
  const scrollY = useScroll();
  const router = useRouter();
  const title = GLOB_CONST.SITE_TITLE;

  const under50px = scrollY < 50;
  const under80px = scrollY < 150;

  const style = {
    backgroundImage: "url('/assets/shadow.png')",
  };

  return (
    <header className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <nav
        className={
          under50px
            ? `${s.nav} ${s.primaryNav}`
            : `${s.nav} ${s.primaryNav} ${s.sticky}`
        }
      >
        <ul>
          {MENU_1.map((menuItem) => {
            const isSubPageActive =
              router.pathname === `${menuItem.PATH}/[year]`;
            const isActive =
              router.pathname === menuItem.PATH || isSubPageActive;

            return (
              <li key={menuItem.NAME}>
                <Link href={menuItem.PATH} key={menuItem.NAME}>
                  <a
                    className={isActive ? `${s.link} ${s.active}` : `${s.link}`}
                  >
                    {menuItem.NAME}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={under50px ? `${s.intro}` : `${s.intro} ${s.introSticky}`}>
        Introduction
      </div>
      <nav
        className={
          under80px
            ? `${s.nav} ${s.secondaryNav}`
            : `${s.nav} ${s.secondaryNav} ${s.sticky}`
        }
      >
        <ul>
          {MENU_2.map((menuItem) => {
            const isActive = router.pathname === menuItem.PATH;

            if (menuItem.NAME === 'Home')
              return (
                <li key={menuItem.NAME} className={s.liHome}>
                  <Link href={menuItem.PATH} key={menuItem.NAME}>
                    <a>
                      <img
                        src="/logo-45.png"
                        alt="Signature de Marion Casters"
                      />
                    </a>
                  </Link>
                </li>
              );
            return (
              <li key={menuItem.NAME}>
                <Link href={menuItem.PATH} key={menuItem.NAME}>
                  <a
                    className={isActive ? `${s.link} ${s.active}` : `${s.link}`}
                  >
                    {menuItem.NAME}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={s.shadow} style={style} />
      </nav>
    </header>
  );
}

Header.propTypes = {
  isHome: PropTypes.bool.isRequired,
};
export default Header;
