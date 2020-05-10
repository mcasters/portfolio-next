import React, { useState } from 'react';

import s from './CustomMobileNav.module.css';
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

  return (
    <div className={s.container}>
      <MenuButton open={menuOpen} onClick={toggleMenu} />
      <Menu
        open={menuOpen}
        onNavigate={leave}
        onLeave={leave}
      />
    </div>
  );
}

export default CustomMobileNav;
