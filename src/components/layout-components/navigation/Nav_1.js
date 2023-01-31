import PropTypes from 'prop-types';

import { MENU_1 } from '../../../constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './Nav_1.module.css';

function Nav_1({ titleDisappear }) {
  const router = useRouter();

  return (
    <nav
      className={
        titleDisappear ? `${s.primaryNav} ${s.sticky}` : `${s.primaryNav}`
      }
    >
      <ul>
        {MENU_1.map((menuItem) => {
          const isSubPageActive = router.pathname === `${menuItem.PATH}/[year]`;
          const isActive = router.pathname === menuItem.PATH || isSubPageActive;

          return (
            <li key={menuItem.NAME}>
              <Link href={menuItem.PATH} key={menuItem.NAME}>
                <a className={isActive ? `${s.link} ${s.active}` : `${s.link}`}>
                  {menuItem.NAME}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Nav_1.propTypes = {
  titleDisappear: PropTypes.bool,
};

export default Nav_1;
