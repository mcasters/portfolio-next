import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import s from './DesktopNav.module.css';
import { MENU as menuItems } from '../../../../constants/router';
import { useRouter } from 'next/router';

export default function DesktopNav({ isHome }) {
  const router = useRouter();

  return (
    <aside className={s.aside}>
      <div className={isHome ? [s.bar, s.homeBar].join(' ') : s.bar}> </div>
      <nav className={s.desktopNav}>
        <ul>
          {menuItems.map((item) => {
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
                    className={
                      router.pathname === item.PATH
                        ? `${s.link} ${s.active}`
                        : `${s.link}`
                    }
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
