import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../../components/ui/NavLink/NavLink';
import s from './ArticleCard.module.css';

function ArticleCard({ article }) {
  const { timeAgo: getTimeAgo } = useContext(AppContext);
  const [timeLabel, setTimeLabel] = useState('');

  useEffect(() => {
    if (article?.publishedAt) {
      setTimeLabel(getTimeAgo(article.publishedAt).label);
    }
  }, [article]);

  if (!article) return null;

  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        <div
          className={s.image}
          style={{ backgroundImage: `url(${article.urlToImage})` }}
          role="img"
          aria-label={article.title}
        />
      </div>
      <div className={s.body}>
        <h3 className={s.title}>{article.title}</h3>
        <p className={s.description}>{article.description}</p>
        <div className={s.footer}>
          <span className={s.time}>{timeLabel}</span>
          <NavLink to={`/articles/${article.aid}`} className={s.readMore}>
            Read More
          </NavLink>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
