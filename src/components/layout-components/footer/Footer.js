/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import s from './Footer.module.css';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import Feedback from './feedback/Feedback';
import { NAMES, ROUTES } from '../../../constants/routes';
import LoginControl from './login-control/LoginControl';

export default function Footer() {
  return (
    <footer className="footer">
      <div className={s.container}>
        <Link href={ROUTES.HOME}>
          <a className={s.link}>{NAMES.HOME}</a>
        </Link>
        <span className={s.dot}>·</span>
        <LoginControl />
        <span className={s.dot}>·</span>
        <Link href={ROUTES.PRIVACY} as={NAMES.PRIVACY}>
          <a className={s.link}>{NAMES.PRIVACY}</a>
        </Link>
        <div className={s.text}>
          ***
          <span>{GLOBAL_CONSTANTS.CONTENT}</span>
          <span>{GLOBAL_CONSTANTS.COPYRIGHT}</span>
        </div>
        <Feedback />
      </div>
    </footer>
  );
}
