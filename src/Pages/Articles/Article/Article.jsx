import { useContext, useEffect, useState } from 'react'
import s from './Article.module.css'
import LinkTag from "../../../Components/LinkTag/LinkTag"
import {AppContext} from "../../../App"
 
function Article({article}) {
  const {dateConversion} = useContext(AppContext)
  const [getArticle, setGetArticle] = useState(null)

  useEffect(() => {
    if(article != null) {
      setGetArticle({ ...article, timePassed: dateConversion(article.publishedAt)[0] })
    }
  }, [article])
    
    if(getArticle)return (
      <div className={s.article}>
        <div className={s.imageWrapper}>
          <img src={getArticle?.urlToImage} className={s.image} />
        </div>

        <div className={s.subDetails}>
          <h2>{article.title}</h2>
          <div className={s.bottom}>
            <span className={s.time}>{getArticle.timePassed}</span>
            <span className={s.category}>{getArticle.category}</span>
            <LinkTag
              className={s.link}
              path={getArticle.url}
              content={"View Full Article"} />
          </div>
        </div>
        <div className={s.contents}>
          <p>{getArticle.description}</p>
        </div>
      </div>
  )
}

export default Article