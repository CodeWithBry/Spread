import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../NavLink/NavLink';
import s from './FeaturedSlider.module.css';

function FeaturedSlider({ articles }) {
  const { timeAgo: getTimeAgo } = useContext(AppContext);
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);
  const items = articles?.slice(0, 8) ?? [];

  useEffect(() => {
    if (!sliderRef.current || !items.length) return;
    const w = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({ left: index * w, behavior: 'smooth' });
  }, [index, items]);

  function prev() { setIndex((i) => (i === 0 ? items.length - 1 : i - 1)); }
  function next() { setIndex((i) => (i === items.length - 1 ? 0 : i + 1)); }

  if (!items.length) return null;

  const article = items[index];

  return (
    <div className={s.slider}>
      <div className={s.track} ref={sliderRef}>
        {items.map((item) => (
          <div
            key={item.aid}
            className={s.slide}
            style={{ backgroundImage: `url(${item.urlToImage})` }}
          />
        ))}
      </div>

      <div className={s.overlay}>
        <span className={s.author}>{article.author ?? 'Spread'}</span>
        <NavLink to={`/articles/${article.aid}`} className={s.headline}>
          {article.title}
        </NavLink>
        <span className={s.time}>
          {article.publishedAt ? getTimeAgo(article.publishedAt).label : ''}
        </span>
      </div>

      <button className={`${s.btn} ${s.btnLeft}`} onClick={prev} aria-label="Previous">
        <i className="fas fa-chevron-left" />
      </button>
      <button className={`${s.btn} ${s.btnRight}`} onClick={next} aria-label="Next">
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}

export default FeaturedSlider;
