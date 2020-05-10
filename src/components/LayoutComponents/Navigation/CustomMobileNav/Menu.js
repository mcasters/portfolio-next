import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import s from './Menu.module.css';
import { MENU as menuItems } from '../../../../constants/router';
import useOnClickOutside from '../../../Hooks/useOnClickOutside/useOnClickOutside';

function Menu({ open, onNavigate, onLeave }) {
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, onLeave, open);

  return (
    <div
      ref={menuRef}
      className={open ? `${s.container} ${s.open}` : `${s.container}`}
    >
      <nav className={s.menuList}>
        {menuItems.map((item) => {
          if (item.NAME === 'Home')
            return (
              <Link key={item.NAME} href={item.PATH}>
                <a className={s.navHomeLink} onClick={onNavigate}>
                  <img
                    className={s.logo}
                    src="/logo-45.png"
                    srcSet="/logo-100.png"
                    alt="Signature de Marion Casters"
                  />
                </a>
              </Link>
            );
          return (
            <Link key={item.NAME} href={item.PATH}>
              <a className={s.item} onClick={onNavigate}>
                {item.NAME}
              </a>
            </Link>
          );
        })}
        <p className={s.name}>Marion Casters</p>
      </nav>
    </div>
  );
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default Menu;
