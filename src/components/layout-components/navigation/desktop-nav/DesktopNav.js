import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './DesktopNav.module.css';
import { MENU_1 as menuItems } from '../../../../constants/routes';
import GLOB_CONST from '../../../../constants/globalConstants';
import useScroll from '../../../hooks/useScroll';

export default function DesktopNav({ isHome }) {
  const router = useRouter();
  const scrollY = useScroll();
  const title = GLOB_CONST.SITE_TITLE;

  return (
    <>
      <h1 className={s.title}>{title}</h1>
      <nav
        className={`${s.nav} ${s.primaryNav}`}
      >
        <ul>
          {menuItems.map((menuItem) => {
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
    </>
  );
}

DesktopNav.propTypes = {
  isHome: PropTypes.bool.isRequired,
};