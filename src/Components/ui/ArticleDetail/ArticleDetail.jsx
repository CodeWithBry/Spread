import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../NavLink/NavLink';
import s from './ArticleDetail.module.css';

function ArticleDetail({ article }) {
  const { timeAgo: getTimeAgo } = useContext(AppContext);
  const [timeLabel, setTimeLabel] = useState('');

  useEffect(() => {
    if (article?.publishedAt) {
      setTimeLabel(getTimeAgo(article.publishedAt).label);
    }
  }, [article]);

  if (!article) return null;

  return (
    <article className={s.detail}>
      <div className={s.imageWrap}>
        <img src={article.urlToImage} alt={article.title} className={s.image} />
      </div>
      <div className={s.content}>
        <h1 className={s.title}>{article.title}</h1>
        <div className={s.meta}>
          <span className={s.time}>{timeLabel}</span>
          {article.category && (
            <span className={s.category}>{article.category}</span>
          )}
          <NavLink to={article.url} className={s.sourceLink}>
            View Full Article <i className="fas fa-external-link-alt" />
          </NavLink>
        </div>
        <p className={s.description}>{article.description}</p>
      </div>
    </article>
  );
}

export default ArticleDetail;
