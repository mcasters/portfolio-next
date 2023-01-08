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
          {menuItems.map((item) => {
            const isActive =
              router.pathname === item.PATH ||
              router.pathname === `${item.PATH}/[year]`;

            if (item.NAME === 'Home')
              return (
                <li key={item.NAME}>
                  <Link href={item.PATH} key={item.NAME}>
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
              <li key={item.NAME}>
                <Link href={item.PATH} key={item.NAME}>
                  <a
                    className={isActive ? `${s.link} ${s.active}` : `${s.link}`}
                  >
                    {item.NAME}
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