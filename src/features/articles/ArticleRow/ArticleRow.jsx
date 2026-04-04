import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../../components/ui/NavLink/NavLink';
import s from './ArticleRow.module.css';

function ArticleRow({ article, large = false }) {
  const { timeAgo: getTimeAgo } = useContext(AppContext);
  const [timeLabel, setTimeLabel] = useState('');

  useEffect(() => {
    if (article?.publishedAt) {
      setTimeLabel(getTimeAgo(article.publishedAt).label);
    }
  }, [article]);

  if (!article?.urlToImage) return null;

  return (
    <article className={`${s.row} ${large ? s.large : ''}`}>
      <div className={s.imageWrap}>
        <img src={article.urlToImage} alt={article.title} className={s.image} />
      </div>
      <div className={s.body}>
        <h3 className={s.title}>{article.title}</h3>
        <p className={s.description}>{article.description}</p>
        <div className={s.meta}>
          <span className={s.time}>{timeLabel}</span>
          {article.category && (
            <span className={s.category}>{article.category}</span>
          )}
          <NavLink to={`/articles/${article.aid}`} className={s.readMore}>
            Read More
          </NavLink>
        </div>
      </div>
    </article>
  );
}

export default ArticleRow;
