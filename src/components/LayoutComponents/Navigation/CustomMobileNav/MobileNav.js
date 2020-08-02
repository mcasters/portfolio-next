import { useState } from 'react';

import s from './MobileNav.module.css';
import Menu from './Menu';
import Button from './Button';

function MobileNav() {
  const [isOpen, setMenuOpen] = useState(false);

  const onClick = () => {
    setMenuOpen(!isOpen);
  };

  const leave = () => {
    setMenuOpen(false);
  };

  return (
    <div className={s.container}>
      <Button isOpen={isOpen} onClick={onClick} />
      <Menu isOpen={isOpen} onNavigate={leave} onLeave={leave} />
    </div>
  );
}

export default MobileNav;
