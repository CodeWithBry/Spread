import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import s from './NavLink.module.css';

function NavLink({ to, children, className, onClick }) {
  const { scrollToTop } = useContext(AppContext);

  function handleClick() {
    scrollToTop();
    onClick?.();
  }

  return (
    <Link
      to={to}
      className={`${s.link} ${className ?? ''}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

export default NavLink;
