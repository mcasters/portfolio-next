/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import s from './Footer.module.css';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import Feedback from '../feedback/Feedback';
import { NAMES, ROUTES } from '../../../constants/router';
import LoginControl from './login-control/LoginControl';

export default function Footer() {
  return (
    <footer className="footer">
      <Feedback />
      <div className={s.container}>
        <span className={s.text}>{GLOBAL_CONSTANTS.COPYRIGHT}</span>
        <Link href={ROUTES.HOME}>
          <a className={s.link}>{NAMES.HOME}</a>
        </Link>
        <span className={s.dot}>·</span>
        <LoginControl />
        <span className={s.dot}>·</span>
        <Link href={ROUTES.PRIVACY} as={NAMES.PRIVACY}>
          <a className={s.link}>{NAMES.PRIVACY}</a>
        </Link>
      </div>
    </footer>
  );
}
