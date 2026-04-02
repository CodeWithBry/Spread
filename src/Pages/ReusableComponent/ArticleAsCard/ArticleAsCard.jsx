import s from './ArticleAsCard.module.css'
import a from "../../Search/Search.module.css"
import LinkTag from '../../../Components/LinkTag/LinkTag'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../App'

function ArticleAsCard({article, className}) {
  const {dateConversion} = useContext(AppContext)
  const [getArticle, setGetArticle] = useState(null)
  
    useEffect(() => {
      if (article) {
        const newArticle = { ...article, timePassed: dateConversion(article.publishedAt) }
        setGetArticle({ ...newArticle })
      }
    }, [article])

  if(getArticle?.urlToImage != null)return (
    <div className={`${s.article} ${className} ${className ? s.bigger : null}`}>
        <div className={s.left}>
            <img src={getArticle.urlToImage}/>
        </div>
        <div className={s.right}>
              <h3><span>{getArticle.title}</span></h3>
              <p>{getArticle.description}</p>
              <div className={s.subDetails}>
                  <span className={s.time}>{getArticle.timePassed}</span>
                  <span className={s.category}>{getArticle.category}</span>
                  <LinkTag
                      className={s.link}
                      path={`/articles/${article.aid}`}
                      content={"Read More"} />
              </div>
        </div>
    </div>
  )
}

export default ArticleAsCard