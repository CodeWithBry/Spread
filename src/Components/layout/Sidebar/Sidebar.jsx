import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../ui/NavLink/NavLink';
import s from './Sidebar.module.css';

const NAV_TABS = [
  { label: 'Home', path: '/home' },
  { label: 'Latest', path: '/latest' },
  { label: 'Articles', path: '/articles' },
  { label: 'Search', path: '/search' },
];

const CATEGORIES = [
  'General', 'Technology', 'Sports', 'Business',
  'Entertainment', 'Health', 'Science', 'Politics',
];

function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activeTab, setActiveTab, wrapperRef } = useContext(AppContext);
  const navigate = useNavigate();

  function handleCategoryClick(category) {
    navigate('/articles');
    setTimeout(() => {
      const el = wrapperRef.current?.querySelector(`#${category}`);
      el?.scrollIntoView({ behavior: 'smooth' });
      setSidebarOpen(false);
    }, 400);
  }

  if (!sidebarOpen) return null;

  return (
    <div className={s.overlay} onClick={() => setSidebarOpen(false)}>
      <div className={s.panel} onClick={(e) => e.stopPropagation()}>
        <section className={s.section}>
          <p className={s.sectionLabel}>Navigation</p>
          <ul className={s.list}>
            {NAV_TABS.map((tab) => (
              <li key={tab.path}>
                <NavLink
                  to={tab.path}
                  className={`${s.item} ${activeTab === tab.label ? s.active : ''}`}
                  onClick={() => { setActiveTab(tab.label); setSidebarOpen(false); }}
                >
                  {tab.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section}>
          <p className={s.sectionLabel}>Categories</p>
          <ul className={s.list}>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  className={s.item}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
