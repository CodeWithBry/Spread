import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import HeroSection from '../../components/layout/HeroSection/HeroSection';
import FeaturedSlider from '../../components/ui/FeaturedSlider/FeaturedSlider';
import ArticleRow from '../../features/articles/ArticleRow/ArticleRow';
import ArticleGrid from '../../features/articles/ArticleGrid/ArticleGrid';
import CategoryBar from '../../features/articles/CategoryBar/CategoryBar';
import s from './Latest.module.css';

function Latest() {
  const { worldNews, setActiveTab } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('General');

  useEffect(() => {
    setActiveTab('Latest');
  }, []);

  function getFiltered(news, category) {
    if (!news?.length) return [];
    if (category === 'General') return news;
    return news.filter((a) => a.category?.toLowerCase() === category.toLowerCase());
  }

  const filtered = getFiltered(worldNews, selectedCategory);

  return (
    <div className={s.page}>
      <HeroSection
        title="Latest News"
        subtitle="Stay up to date with the most recent stories from around the world."
      />

      <div className={s.spotlight}>
        <div className={s.sliderWrap}>
          <FeaturedSlider articles={worldNews} />
        </div>
        <div className={s.sidebar}>
          <h3 className={s.sidebarHeading}>Recent Articles</h3>
          <div className={s.sidebarList}>
            {worldNews?.slice(0, 12).map((article) => (
              <ArticleRow key={article.aid} article={article} />
            ))}
          </div>
        </div>
      </div>

      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />

      <ArticleGrid articles={filtered} title={selectedCategory} />
    </div>
  );
}

export default Latest;
