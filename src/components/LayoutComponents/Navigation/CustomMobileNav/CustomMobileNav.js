import React, { useState } from 'react';

import s from './CustomMobileNav.module.css';
import ROUTER_CONSTANT from '../../../../constants/router';
import Menu from './Menu';
import MenuButton from './MenuButton';

function CustomMobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const leave = async () => {
    setMenuOpen(false);
  };

  const toggleMenu = async () => {
    setMenuOpen(!menuOpen);
  };

  const routes = [
    ['Présentation', `${ROUTER_CONSTANT.PRESENTATION}`],
    ['Peintures', `${ROUTER_CONSTANT.PEINTURES}`],
    ['Sculptures', `${ROUTER_CONSTANT.SCULPTURES}`],
    ['Dessins', `${ROUTER_CONSTANT.DESSINS}`],
    ['Contact', `${ROUTER_CONSTANT.CONTACT}`],
    ['Home', `${ROUTER_CONSTANT.HOME}`],
  ];

  return (
    <div className={s.container}>
      <MenuButton open={menuOpen} onClick={toggleMenu} />
      <Menu
        open={menuOpen}
        onNavigate={leave}
        routes={routes}
        onLeave={leave}
      />
    </div>
  );
}

export default CustomMobileNav;
