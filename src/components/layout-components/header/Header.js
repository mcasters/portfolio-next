import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import s from './Header.module.css';
import GLOB_CONST from '../../../constants/globalConstants';
import { useRouter } from 'next/router';
import { MENU_1, MENU_2 } from '../../../constants/routes';
import Link from 'next/link';
import Content from '../../content/Content';
import useElementIsUpTo from "../../hooks/useElementIsUpTo";

function Header({ isHome, introduction }) {
  const titleRef = useRef();
  const introRef = useRef();

  const titleDisappear = isHome ? useElementIsUpTo(titleRef, 8) : true;
  const introDisappear = isHome ? useElementIsUpTo(introRef, 38) : true;
  const router = useRouter();

  const style = {
    backgroundImage: "url('/assets/shadow.png')",
  };

  return (
    <header className={s.container}>
      {isHome && <h1 ref={titleRef} className={s.title}>{GLOB_CONST.SITE_TITLE}</h1>}
      <nav
        className={titleDisappear ? `${s.primaryNav} ${s.sticky}` : `${s.primaryNav}`}
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
      {isHome && (
        <div
          ref={introRef}
          className={titleDisappear ? `${s.intro} ${s.introSticky}` : `${s.intro}`}
        >
          {introduction && <Content text={introduction} />}
        </div>
      )}
      <nav
        className={
          introDisappear ? `${s.secondaryNav} ${s.sticky}` : `${s.secondaryNav}`
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
                        style={{ width: '35px' }}
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
  introduction: PropTypes.string,
};
export default Header;
