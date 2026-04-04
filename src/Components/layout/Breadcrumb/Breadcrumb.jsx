import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../ui/NavLink/NavLink';
import s from './Breadcrumb.module.css';

function Breadcrumb() {
  const { currentPath } = useContext(AppContext);
  const [parts, setParts] = useState([]);

  useEffect(() => {
    if (currentPath) {
      setParts(currentPath.split('/').filter(Boolean));
    }
  }, [currentPath]);

  if (parts.length <= 1) return null;

  return (
    <nav className={s.breadcrumb} aria-label="Breadcrumb">
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1;
        const href = '/' + parts.slice(0, index + 1).join('/');
        return (
          <span key={index} className={s.segment}>
            <span className={s.separator}>/</span>
            {isLast ? (
              <span className={s.current}>{part}</span>
            ) : (
              <NavLink to={href} className={s.link}>
                {part}
              </NavLink>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
