import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/search/SearchBar/SearchBar';
import ArticleRow from '../../features/articles/ArticleRow/ArticleRow';
import s from './Search.module.css';

function Search() {
  const { worldNews, phNews, setActiveTab, filterArticles } = useContext(AppContext);
  const { searchInputParams } = useParams();
  const [searchInput, setSearchInput] = useState(
    searchInputParams?.replace(/_/g, ' ') ?? ''
  );
  const [results, setResults] = useState([]);

  useEffect(() => {
    setActiveTab('Search');
  }, []);

  useEffect(() => {
    if (!searchInputParams || (!worldNews.length && !phNews.length)) {
      setResults([]);
      return;
    }
    const query = searchInputParams.replace(/_/g, ' ').toLowerCase();
    const all = [...worldNews, ...phNews];
    const found = all.filter(
      (a) =>
        a.title?.toLowerCase().includes(query) ||
        a.description?.toLowerCase().includes(query)
    );
    setResults(found);
  }, [searchInputParams, worldNews, phNews]);

  function handleSearchChange(val) {
    setSearchInput(val);
    filterArticles(val);
  }

  return (
    <div className={s.page}>
      <div className={s.searchWrap}>
        <SearchBar
          value={searchInput}
          onChange={handleSearchChange}
          className={s.searchBar}
          hideDropdown
        />
      </div>

      {searchInputParams && (
        <div className={s.resultsHeader}>
          <p className={s.count}>
            {results.length > 0
              ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${searchInputParams.replace(/_/g, ' ')}"`
              : `No results found for "${searchInputParams.replace(/_/g, ' ')}"`}
          </p>
        </div>
      )}

      <div className={s.results}>
        {results.map((article) => (
          <ArticleRow key={article.aid} article={article} large />
        ))}
      </div>
    </div>
  );
}

export default Search;
