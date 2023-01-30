import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES, NAMES } from '../../../../constants/routes';

import s from './AdminNav.module.css';

export default function AdminNav() {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <nav className={s.adminNav}>
      <ul>
        <li>
          <Link href={ROUTES.A_HOME}>
            <a className={router.asPath === ROUTES.A_HOME ? `${s.active}` : ''}>
              {NAMES.HOME}
            </a>
          </Link>
        </li>
        <li>
          <Link href={ROUTES.A_PRESENTATION}>
            <a
              className={
                router.asPath === ROUTES.A_PRESENTATION ? `${s.active}` : ''
              }
            >
              {NAMES.PRESENTATION}
            </a>
          </Link>
        </li>
        <li>
          <Link href={ROUTES.A_PAINTING}>
            <a
              className={
                router.asPath === ROUTES.A_PAINTING ? `${s.active}` : ''
              }
            >
              {NAMES.PAINTING}
            </a>
          </Link>
        </li>
        <li>
          <Link href={ROUTES.A_SCULPTURE}>
            <a
              className={
                router.asPath === ROUTES.A_SCULPTURE ? `${s.active}` : ''
              }
            >
              {NAMES.SCULPTURE}
            </a>
          </Link>
        </li>
        <li>
          <Link href={ROUTES.A_DRAWING}>
            <a
              className={
                router.asPath === ROUTES.A_DRAWING ? `${s.active}` : ''
              }
            >
              {NAMES.DRAWING}
            </a>
          </Link>
        </li>
        <li>
          <Link href={ROUTES.A_CONTACT}>
            <a
              className={
                router.asPath === ROUTES.A_CONTACT ? `${s.active}` : ''
              }
            >
              {NAMES.CONTACT}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
