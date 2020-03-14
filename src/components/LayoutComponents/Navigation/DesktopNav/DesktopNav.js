import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import s from './DesktopNav.module.css';
import ROUTER_CONSTANT from '../../../../constants/router';
import { useRouter } from 'next/router';

export default function DesktopNav({ isHome }) {
  const router = useRouter();

  return (
    <aside className={s.aside}>
      <div className={isHome ? [s.bar, s.homeBar].join(' ') : s.bar}> </div>
      <nav className={s.desktopNav}>
        <Link href={ROUTER_CONSTANT.PRESENTATION}>
          <a
            className={
              router.pathname === ROUTER_CONSTANT.PRESENTATION
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Présentation
          </a>
        </Link>
        <Link href={ROUTER_CONSTANT.PEINTURES}>
          <a
            className={
              router.pathname === ROUTER_CONSTANT.PEINTURES
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Peintures
          </a>
        </Link>
        <Link href={ROUTER_CONSTANT.SCULPTURES}>
          <a
            className={
              router.pathname === ROUTER_CONSTANT.SCULPTURES
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Sculptures
          </a>
        </Link>
        <Link href={ROUTER_CONSTANT.DESSINS}>
          <a
            className={
              router.pathname === ROUTER_CONSTANT.DESSINS
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Dessins
          </a>
        </Link>
        <Link href={ROUTER_CONSTANT.CONTACT}>
          <a
            className={
              router.pathname === ROUTER_CONSTANT.CONTACT
                ? `${s.link} ${s.active}`
                : `${s.link}`
            }
          >
            Contact
          </a>
        </Link>
        <Link href={ROUTER_CONSTANT.HOME}>
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
