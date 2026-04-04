import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import NavLink from '../../../components/ui/NavLink/NavLink';
import s from './NewsFeed.module.css';

function NewsFeed({ articles }) {
  const { timeAgo: getTimeAgo, scrollToTop } = useContext(AppContext);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    if (articles?.length) setItems(articles.slice(0, 10));
  }, [articles]);

  useEffect(() => {
    if (!trackRef.current || !items.length) return;
    const itemWidth = trackRef.current.clientWidth;
    trackRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
  }, [index, items]);

  function prev() {
    setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  }

  if (!items.length) return null;

  const article = items[index];
  const timeLabel = article?.publishedAt ? getTimeAgo(article.publishedAt).label : '';

  return (
    <section className={s.feed}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <i className="fas fa-sync-alt" />
          <h2>Latest News</h2>
        </div>
        <NavLink to="/latest" className={s.viewAll}>
          <i className="fas fa-external-link-alt" /> View All
        </NavLink>
      </div>

      <div className={s.carousel}>
        <div className={s.track} ref={trackRef}>
          {items.map((item) => (
            <div
              key={item.aid}
              className={s.slide}
              style={{ backgroundImage: `url(${item.urlToImage})` }}
            />
          ))}
        </div>

        <div className={s.overlay}>
          <div className={s.meta}>
            <span className={s.badge}>Breaking News</span>
            <span className={s.time}>{timeLabel}</span>
          </div>
          <h3 className={s.articleTitle}>{article.title}</h3>
          <p className={s.desc}>{article.description}</p>
          <NavLink
            to={`/articles/${article.aid}`}
            className={s.readBtn}
            onClick={scrollToTop}
          >
            Read More <i className="fas fa-arrow-right" />
          </NavLink>
        </div>

        <div className={s.controls}>
          <button className={s.arrow} onClick={prev} aria-label="Previous">
            <i className="fas fa-chevron-left" />
          </button>
          <div className={s.dots}>
            {items.map((_, i) => (
              <button
                key={i}
                className={`${s.dot} ${i === index ? s.dotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button className={s.arrow} onClick={next} aria-label="Next">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsFeed;
