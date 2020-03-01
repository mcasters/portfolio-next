/* eslint-disable css-modules/no-undef-class */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import s from './Menu.module.css';
import useOnClickOutside from '../../../Hooks/useOnClickOutside/useOnClickOutside';

function Menu({ open, onNavigate, routes, onLeave }) {
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, onLeave, open);

  return (
    <div
      ref={menuRef}
      className={open ? `${s.container} ${s.open}` : `${s.container}`}
    >
      <nav className={s.menuList}>
        {routes.map(route => {
          if (route[0] === 'Home') {
            return (
              <Link
                key={route[0]}
                className={s.navHomeLink}
                href={route[1]}
                onClick={onNavigate}
              >
                <img
                  src="/logo-45.png"
                  srcSet="/logo-100.png"
                  alt="Signature de Marion Casters"
                />
              </Link>
            );
          }
          return (
            <Link
              key={route[0]}
              className={s.item}
              href={route[1]}
              onClick={onNavigate}
            >
              <a>{route[0]}</a>
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
  routes: PropTypes.array.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default Menu;
