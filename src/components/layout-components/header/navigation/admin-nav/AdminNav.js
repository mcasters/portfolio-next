import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTES, NAMES } from '../../../../../constants/routes';
import s from './AdminNav.module.css';

export default function AdminNav() {
  const router = useRouter();

  return (
    <nav className={s.adminNav}>
      <ul>
        <li>
          <Link
            href={ROUTES.A_HOME}
            className={router.asPath === ROUTES.A_HOME ? `${s.active}` : undefined}
            legacyBehavior={false}
          >
            {NAMES.HOME}
          </Link>
        </li>
        <li>
          <Link
            href={ROUTES.A_PRESENTATION}
            className={router.asPath === ROUTES.A_PRESENTATION ? `${s.active}` : undefined}
            legacyBehavior={false}
          >
            {NAMES.PRESENTATION}
          </Link>
        </li>
        <li>
          <Link
            href={ROUTES.A_PAINTING}
            className={router.asPath === ROUTES.A_PAINTING ? `${s.active}` : undefined}
            legacyBehavior={false}
          >
            {NAMES.PAINTING}
          </Link>
        </li>
        <li>
          <Link
            href={ROUTES.A_SCULPTURE}
            className={router.asPath === ROUTES.A_SCULPTURE ? `${s.active}` : undefined}
            legacyBehavior={false}
          >
            {NAMES.SCULPTURE}
          </Link>
        </li>
        <li>
          <Link
            href={ROUTES.A_DRAWING}
            className={router.asPath === ROUTES.A_DRAWING ? `${s.active}` : undefined}
            legacyBehavior={false}
          >
            {NAMES.DRAWING}
          </Link>
        </li>
        <li>
          <Link
            href={ROUTES.A_CONTACT}
            className={router.asPath === ROUTES.A_CONTACT ? `${s.active}` : undefined}
            legacyBehavior={false}
          >
            {NAMES.CONTACT}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
