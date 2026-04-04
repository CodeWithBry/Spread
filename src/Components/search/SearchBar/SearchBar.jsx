import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../ui/NavLink/NavLink';
import s from './SearchBar.module.css';

function SearchBar({ value, onChange, className, hideDropdown = false }) {
  const { searchRecommendations, navigateToSearch } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleKeyDown(e) {
    if (e.key === 'Enter') navigateToSearch(value);
  }

  return (
    <div
      className={`${s.wrapper} ${className ?? ''}`}
      onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
    >
      <div className={s.inputRow}>
        <div className={s.inputWrap}>
          <i className={`fa fa-search ${s.icon}`} />
          <input
            type="text"
            placeholder="Search news..."
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={() => setDropdownOpen(true)}
          />
          {value && (
            <button className={s.clear} onClick={() => onChange('')} aria-label="Clear">
              <i className="fa fa-times" />
            </button>
          )}
          {dropdownOpen && !hideDropdown && searchRecommendations?.length > 0 && (
            <div className={s.dropdown}>
              {searchRecommendations.map((article) => (
                <NavLink
                  key={article.aid}
                  to={`/articles/${article.aid}`}
                  className={s.dropdownItem}
                >
                  {article.title}
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <button
          className={s.searchBtn}
          onClick={() => navigateToSearch(value)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
