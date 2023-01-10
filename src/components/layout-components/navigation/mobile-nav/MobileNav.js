import React, { useRef, useState } from 'react';

import s from './MobileNav.module.css';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { MENU as menuItems } from '../../../../constants/routes';
import Link from 'next/link';

function MobileNav() {
  const [isOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const close = () => {
    setMenuOpen(false);
  };
  useOnClickOutside(menuRef, close, isOpen);

  const styles = {
    line: {
      height: '2px',
      width: '20px',
      background: '#ab8b8b',
      transition: 'all 0.2s ease',
    },
    lineTop: {
      transform: isOpen ? 'rotate(45deg)' : 'none',
      transformOrigin: 'top left',
      marginBottom: '5px',
    },
    lineMiddle: {
      opacity: isOpen ? 0 : 1,
      transform: isOpen ? 'translateX(-16px)' : 'none',
    },
    lineBottom: {
      transform: isOpen ? 'translateX(-1px) rotate(-45deg)' : 'none',
      transformOrigin: 'top left',
      marginTop: '5px',
    },
  };

  const toggle = (e) => {
    e.preventDefault();
    setMenuOpen(!isOpen);
  };

  return (
    <nav className={s.menu}>
      <button
        className={s.menuButton}
        onClick={toggle}
        aria-label="Menu"
        tabIndex={0}
        type="button"
      >
        <div style={{ ...styles.line, ...styles.lineTop }} />
        <div style={{ ...styles.line, ...styles.lineMiddle }} />
        <div style={{ ...styles.line, ...styles.lineBottom }} />
      </button>
      <ul
        ref={menuRef}
        className={
          isOpen ? `${s.menuList} ${s.open}` : `${s.menuList}`
        }
      >
        {menuItems.map((item) => {
          if (item.NAME === 'Home')
            return (
              <li key={item.NAME}>
                <Link key={item.NAME} href={item.PATH}>
                  <a className={s.navHomeLink} onClick={close}>
                    <img
                      className={s.logo}
                      src="/logo-45.png"
                      srcSet="/logo-100.png"
                      alt="Signature de Marion Casters"
                    />
                  </a>
                </Link>
              </li>
            );
          return (
            <li key={item.NAME}>
              <Link key={item.NAME} href={item.PATH}>
                <a className={s.item} onClick={close}>
                  {item.NAME}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className={s.name}>Marion Casters</p>
    </nav>
  );
}

export default MobileNav;