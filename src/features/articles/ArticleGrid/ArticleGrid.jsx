import { useEffect, useState } from 'react';
import NavLink from '../../../components/ui/NavLink/NavLink';
import ArticleCard from '../ArticleCard/ArticleCard';
import s from './ArticleGrid.module.css';

function ArticleGrid({ articles, title, id }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (articles) setFiltered(articles);
  }, [articles]);

  return (
    <section className={s.section} id={id}>
      <div className={s.inner}>
        <div className={s.header}>
          <i className="fas fa-layer-group" />
          <div className={s.headerText}>
            <h2 className={s.heading}>{title}</h2>
            <NavLink to="/articles" className={s.headerLink}>
              <i className="fas fa-external-link-alt" />
              View All
            </NavLink>
          </div>
        </div>
        <div className={s.grid}>
          {filtered.length > 0 ? (
            filtered.map((article) => (
              <ArticleCard key={article.aid} article={article} />
            ))
          ) : (
            <p className={s.empty}>No articles found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ArticleGrid;
