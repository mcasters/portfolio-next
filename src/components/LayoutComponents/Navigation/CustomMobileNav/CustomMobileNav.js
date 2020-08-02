import { useState } from 'react';

import s from './CustomMobileNav.module.css';
import Menu from './Menu';
import MenuButton from './MenuButton';

function CustomMobileNav() {
  const [isOpen, setMenuOpen] = useState(false);

  const leave = () => {
    setMenuOpen(false);
  };

  const toggleMenu = e => {
    e.preventDefault();
    console.log('///// open menu 1 : ' + isOpen);
    setMenuOpen(!isOpen);
    console.log('///// open menu 2 : ' + isOpen);
  };

  return (
    <div className={s.container}>
      <button onClick={toggleMenu} type="button">MM</button>
      <Menu
        isOpen={isOpen}
        onNavigate={leave}
        onLeave={leave}
      />
    </div>
  );
}

export default CustomMobileNav;
