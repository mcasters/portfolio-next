import PropTypes from 'prop-types';

import { MENU_2 } from '../../../constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './Nav_2.module.css';

function Nav_2({ introDisappear }) {
  const router = useRouter();

  const style = {
    backgroundImage: "url('/assets/shadow.png')",
  };

  return (
    <nav
      className={
        introDisappear ? `${s.secondaryNav} ${s.sticky}` : `${s.secondaryNav}`
      }
    >
      <ul>
        {MENU_2.map((menuItem) => {
          const isActive = router.pathname === menuItem.PATH;

          if (menuItem.NAME === 'Home')
            return (
              <li key={menuItem.NAME} className={s.liHome}>
                <Link href={menuItem.PATH} key={menuItem.NAME}>
                  <a>
                    <img
                      src="/logo-45.png"
                      alt="Signature de Marion Casters"
                      style={{ width: '35px' }}
                    />
                  </a>
                </Link>
              </li>
            );
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
      <div className={s.shadow} style={style} />
    </nav>
  );
}

Nav_2.propTypes = {
  introDisappear: PropTypes.bool.isRequired,
};

export default Nav_2;
