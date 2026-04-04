import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { API_BASE_URL } from '../../context/AppContext';
import HeroSection from '../../components/layout/HeroSection/HeroSection';
import SearchBar from '../../components/search/SearchBar/SearchBar';
import ArticleDetail from '../../components/ui/ArticleDetail/ArticleDetail';
import ArticleGrid from '../../features/articles/ArticleGrid/ArticleGrid';
import Spinner from '../../components/ui/Spinner/Spinner';
import s from './Articles.module.css';

const CATEGORIES = [
  'General', 'Technology', 'Sports', 'Business',
  'Entertainment', 'Health', 'Science', 'Politics',
];

function Articles() {
  const { worldNews, phNews, setActiveTab, filterArticles, processArticleData } = useContext(AppContext);
  const { articleAID } = useParams();

  const [searchInput, setSearchInput] = useState('');
  const [focusedArticle, setFocusedArticle] = useState(null);
  const [extraNews, setExtraNews] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreLoaded, setMoreLoaded] = useState(false);

  useEffect(() => {
    setActiveTab('Articles');
  }, []);

  useEffect(() => {
    if (!articleAID || (!worldNews.length && !phNews.length)) {
      setFocusedArticle(null);
      return;
    }
    const all = [...phNews, ...worldNews];
    const found = all.find((a) => a.aid?.toLowerCase() === articleAID.toLowerCase());
    setFocusedArticle(found ?? null);
  }, [articleAID, worldNews, phNews]);

  function handleSearchChange(val) {
    setSearchInput(val);
    filterArticles(val);
  }

  async function loadMore() {
    setLoadingMore(true);
    try {
      const res = await fetch(`${API_BASE_URL}/loadMoreNews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ worldNews }),
      });
      const data = await res.json();
      const processed = processArticleData(data, []);
      setExtraNews(processed.worldNews);
      setMoreLoaded(true);
    } catch {
      /* silently fail */
    } finally {
      setLoadingMore(false);
    }
  }

  function getByCategory(news, category) {
    if (!news?.length) return [];
    return news.filter((a) => a.category?.toLowerCase() === category.toLowerCase());
  }

  const combined = [...(phNews ?? []), ...(worldNews ?? [])];

  return (
    <div className={s.page}>
      <HeroSection
        title="Read Articles"
        subtitle="Breaking news and comprehensive coverage of international events, global politics, and worldwide developments."
      >
        <SearchBar
          value={searchInput}
          onChange={handleSearchChange}
          className={s.search}
        />
      </HeroSection>

      {focusedArticle && <ArticleDetail article={focusedArticle} />}

      {CATEGORIES.map((cat) => {
        const articles = getByCategory(combined, cat);
        if (!articles.length) return null;
        return (
          <ArticleGrid
            key={cat}
            articles={articles}
            title={cat}
            id={cat}
          />
        );
      })}

      {extraNews?.length > 0 && (
        <ArticleGrid articles={extraNews} title="Discover More" />
      )}

      {!moreLoaded && (
        <div className={s.loadMore}>
          <button className={s.loadMoreBtn} onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? <Spinner size={22} /> : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Articles;
