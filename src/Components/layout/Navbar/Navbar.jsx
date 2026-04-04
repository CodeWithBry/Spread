import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../ui/NavLink/NavLink';
import s from './Navbar.module.css';

const NAV_TABS = [
  { label: 'Home', path: '/home' },
  { label: 'Latest', path: '/latest' },
  { label: 'Articles', path: '/articles' },
  { label: 'Search', path: '/search' },
];

function Navbar() {
  const { navRef, sidebarOpen, setSidebarOpen, activeTab, setActiveTab } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav className={s.nav} ref={navRef}>
      <div className={s.brand} onClick={() => navigate('/home')} role="button" tabIndex={0}>
        <img src="./Icons/logo.png" alt="Spread logo" />
        <span>Spread</span>
      </div>

      <ul className={s.links}>
        {NAV_TABS.map((tab) => (
          <li key={tab.path}>
            <NavLink
              to={tab.path}
              className={`${s.link} ${activeTab === tab.label ? s.active : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className={s.menuBtn}
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <i className={sidebarOpen ? 'fa fa-times' : 'fas fa-bars'} />
      </button>
    </nav>
  );
}

export default Navbar;
