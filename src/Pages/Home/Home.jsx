import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import HeroSection from '../../components/layout/HeroSection/HeroSection';
import SearchBar from '../../components/search/SearchBar/SearchBar';
import NewsFeed from '../../features/home/NewsFeed/NewsFeed';
import ArticleGrid from '../../features/articles/ArticleGrid/ArticleGrid';
import CategoryBar from '../../features/articles/CategoryBar/CategoryBar';
import s from './Home.module.css';

function Home() {
  const { worldNews, phNews, setActiveTab, filterArticles } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');

  useEffect(() => {
    setActiveTab('Home');
  }, []);

  function getFiltered(news, category) {
    if (!news?.length) return [];
    if (category === 'General') return news;
    return news.filter((a) => a.category?.toLowerCase() === category.toLowerCase());
  }

  function handleSearchChange(val) {
    setSearchInput(val);
    filterArticles(val);
  }

  const filteredWorld = getFiltered(worldNews, selectedCategory);
  const filteredPH = getFiltered(phNews, selectedCategory);

  return (
    <div className={s.page}>
      <HeroSection
        title="World News"
        subtitle="Breaking news and comprehensive coverage of international events, global politics, and worldwide developments."
      >
        <SearchBar
          value={searchInput}
          onChange={handleSearchChange}
          className={s.search}
        />
      </HeroSection>

      <NewsFeed articles={worldNews} />

      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />

      {filteredWorld.length > 0 && (
        <ArticleGrid articles={filteredWorld} title={selectedCategory} />
      )}

      {filteredPH.length > 0 && (
        <ArticleGrid articles={filteredPH} title="Philippines" />
      )}
    </div>
  );
}

export default Home;
