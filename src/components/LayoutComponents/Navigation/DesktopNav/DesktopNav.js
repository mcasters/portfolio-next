import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import s from './DesktopNav.module.css';
import ROUTER from '../../../../constants/router';
import { useRouter } from 'next/router';

export default function DesktopNav({ isHome }) {
  const router = useRouter();

  return (
    <aside className={s.aside}>
      <div className={isHome ? [s.bar, s.homeBar].join(' ') : s.bar} />
      <nav className={s.desktopNav}>
        <Link href={ROUTER.PRESENTATION}>
          <a
            className={
              router.pathname === ROUTER.PRESENTATION
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Présentation
          </a>
        </Link>
        <Link href={ROUTER.PEINTURES}>
          <a
            className={
              location === ROUTER.PEINTURES
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Peintures
          </a>
        </Link>
        <Link href={ROUTER.SCULPTURES}>
          <a
            className={
              location === ROUTER.SCULPTURES
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Sculptures
          </a>
        </Link>
        <Link href={ROUTER.DESSINS}>
          <a
            className={
              location === ROUTER.DESSINS
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Dessins
          </a>
        </Link>
        <Link href={ROUTER.CONTACT}>
          <a
            className={
              location === ROUTER.CONTACT
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Contact
          </a>
        </Link>
        <Link href={ROUTER.HOME}>
          <a className={s.linkHome}>
            <img src="/logo-100.png" alt="Signature de Marion Casters" />
          </a>
        </Link>
      </nav>
    </aside>
  );
}

DesktopNav.propTypes = {
  isHome: PropTypes.bool.isRequired,
};
