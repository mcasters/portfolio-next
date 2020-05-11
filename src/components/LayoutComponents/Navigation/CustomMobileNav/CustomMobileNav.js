import { useState } from 'react';

import s from './CustomMobileNav.module.css';
import Menu from './Menu';
import MenuButton from './MenuButton';

function CustomMobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const leave = async () => {
    setMenuOpen(false);
  };

  const toggleMenu = async () => {
    console.log('///// open menu 1 : ' + menuOpen);
    setMenuOpen(() => !menuOpen);
    console.log('///// open menu 2 : ' + menuOpen);
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
