import React from 'react';
import Link from 'next/link';

import s from './Footer.module.css';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import Feedback from '../Feedback/Feedback';
import ROUTER from '../../../constants/router';
import LoginToggle from './loginToggle';

export default function Footer() {
  return (
    <footer className="footer">
      <Feedback />
      <div className={s.container}>
        <span className={s.text}>{GLOBAL_CONSTANTS.COPYRIGHT}</span>
        <Link href={ROUTER.HOME}>
          <a className={s.homeLink}>Home</a>
        </Link>
        <span className={s.dot}>·</span>
        <LoginToggle />
        <span className={s.dot}>·</span>
        <Link href={ROUTER.CONFIDENTIALITE}>
          <a className={s.link}>Privacy</a>
        </Link>
      </div>
    </footer>
  );
}
