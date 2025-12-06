import s from './Banner.module.css'
import Button from '../../../../Components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import LinkTag from '../../../../Components/LinkTag/LinkTag'

function Banner({ article, handleSlide }) {
    const { dateConversion } = useContext(AppContext)
    const [getArticle, setGetArticle] = useState(null)

    useEffect(() => {
        if (article) {
            const newArticle = { ...article, timePassed: dateConversion(article.publishedAt) }
            setGetArticle({ ...newArticle })
        }
    }, [article])

    if(getArticle)return (
        <div className={s.banner}>
            <div className={s.buttons}>
                <Button
                    element={(<i className='fas fa-angle-left' />)}
                    clickListener={() => handleSlide(true)}
                    className={s.button} />
                <Button
                    element={(<i className='fas fa-angle-right' />)}
                    clickListener={() => handleSlide(false)}
                    className={s.button} />
            </div>
            <div className={s.image} style={{backgroundImage: `url(${getArticle.urlToImage})` }}></div>
            <div className={s.contents}>
                <span className={s.category}>{getArticle.author}</span>
                <LinkTag className={s.headline} content={getArticle.title}></LinkTag>
                <span className={s.time}>{getArticle.timePassed}</span>
            </div>
        </div>
    )
}

export default Banner