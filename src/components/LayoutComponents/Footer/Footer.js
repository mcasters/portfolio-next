/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

import s from './Footer.module.css';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import Feedback from '../Feedback/Feedback';
import ROUTER_CONSTANT from '../../../constants/router';
import LoginControl from './LoginControl/LoginControl';

export default function Footer() {
  return (
    <footer className="footer">
      <Feedback />
      <div className={s.container}>
        <span className={s.text}>{GLOBAL_CONSTANTS.COPYRIGHT}</span>
        <Link href={ROUTER_CONSTANT.HOME}>
          <a className={s.link}>Home</a>
        </Link>
        <span className={s.dot}>·</span>
        <LoginControl />
        <span className={s.dot}>·</span>
        <Link
          href={ROUTER_CONSTANT.PRIVACY}
          as={ROUTER_CONSTANT.CONFIDENTIALITE}
        >
          <a className={s.link}>Privacy</a>
        </Link>
      </div>
    </footer>
  );
}
