import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './DesktopNav.module.css';
import { MENU as menuItems } from '../../../../constants/routes';

export default function DesktopNav({ isHome }) {
  const router = useRouter();

  return (
    <aside className={s.aside}>
      <div className={isHome ? [s.bar, s.homeBar].join(' ') : s.bar}> </div>
      <nav className={s.desktopNav}>
        <ul>
          {menuItems.map((menuItem) => {
            const isSubPageActive =
              router.pathname === `${menuItem.PATH}/[year]`;
            const isActive =
              router.pathname === menuItem.PATH || isSubPageActive;

            if (menuItem.NAME === 'Home')
              return (
                <li key={menuItem.NAME}>
                  <Link href={menuItem.PATH} key={menuItem.NAME}>
                    <a className={s.linkHome}>
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
      </nav>
    </aside>
  );
}

DesktopNav.propTypes = {
  isHome: PropTypes.bool.isRequired,
};