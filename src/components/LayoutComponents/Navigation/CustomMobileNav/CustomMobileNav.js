import React, { useState } from 'react';

import s from './CustomMobileNav.module.css';
import ROUTER from '../../../../constants/router';
import Menu from './Menu';
import MenuButton from './MenuButton';

function CustomMobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const leave = e => {
    e.preventDefault();
    setMenuOpen(false);
  };

  const navigate = () => {
    setMenuOpen(false);
  };

  const toggleMenu = e => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const routes = [
    ['Présentation', `${ROUTER.PRESENTATION}`],
    ['Peintures', `${ROUTER.PEINTURES}`],
    ['Sculptures', `${ROUTER.SCULPTURES}`],
    ['Dessins', `${ROUTER.DESSINS}`],
    ['Contact', `${ROUTER.CONTACT}`],
    ['Home', `${ROUTER.HOME}`],
  ];

  return (
    <div className={s.container}>
      <MenuButton open={menuOpen} onClick={toggleMenu} />
      <Menu
        open={menuOpen}
        onNavigate={navigate}
        routes={routes}
        onLeave={leave}
      />
    </div>
  );
}

export default CustomMobileNav;
