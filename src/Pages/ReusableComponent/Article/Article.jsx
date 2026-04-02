import { useContext, useEffect, useState } from 'react'
import LinkTag from '../../../Components/LinkTag/LinkTag'
import s from './Article.module.css'
import { AppContext } from '../../../App'

function Article({ article, selectedCategory }) {
  const { dateConversion } = useContext(AppContext)
  const [getArticle, setGetArticle] = useState(null)

  useEffect(() => {
    if (article) {
      const newArticle = { ...article, timePassed: dateConversion(article.publishedAt)[0] }
      setGetArticle({ ...newArticle })
    }
  }, [article])

  if (getArticle) return (
    <div className={s.article}>
        <div className={s.top}>
        <div style={{ backgroundImage: `url(${getArticle.urlToImage})` }} className={s.image}></div>
        </div>
        <div className={s.bottom}>
        <h3>{getArticle.title}</h3>
        <p>{getArticle.description}</p>
        <div className={s.subDetails}>
          <span>{getArticle.timePassed}</span>
          <LinkTag
            className={s.link}
            path={`/articles/${article?.aid}`}
            content={"Read More"} />
        </div>
        </div>
    </div>
  )
}

export default Article