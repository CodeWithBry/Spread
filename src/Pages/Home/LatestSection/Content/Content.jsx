import s from './Content.module.css'
import Button from "../../../../Components/Button/Button"
import { useContext, useState, useEffect } from 'react'
import { AppContext } from "../../../../App"

function Content({ handleScroll, articleData, news, ind, wrapperRef }) {
    const { navigation, dateConversion, scrollToTop } = useContext(AppContext)
    const [getArticle, setGetArticle] = useState(null)

    function handleScrollToView(index) {
        const element = wrapperRef.current
        const sections = element.querySelectorAll(`.${s.contentSection}`)
        console.log(index)
        console.log(sections)
        sections.forEach((el, i) => {
            if (i == index) { console.log(el.offsetWidth, element.scrollLeft), element.scrollTo({ left: (el.offsetWidth * i), behavior: "smooth" }) }
        });
    }

    useEffect(() => {
        if (articleData != null) {
            console.log(articleData.publishedAt)
            const newArticle = { ...articleData, timePassed: dateConversion(articleData.publishedAt)[0] }
            setGetArticle({ ...newArticle })
        }
    }, [articleData])

    if (getArticle) return (
        <div className={`${s.content} ${s.contentSection}`}>
            <div className={s.left}>
                <div src={getArticle.urlToImage} className={s.image} style={{ backgroundImage: `url(${getArticle.urlToImage})` }}></div>
            </div>
            <div className={s.right}>
                <div className={s.contents}>
                    <div className={s.info}>
                        <p className={s.time}>
                            {getArticle.timePassed}
                        </p>
                        <p className={s.breakingNews}>
                            Breaking News
                        </p>
                    </div>
                    <h1>
                        {getArticle.title}
                    </h1>
                    <p className={s.shortDesc}>
                        {getArticle.description}
                    </p>
                    <Button
                        className={s.button}
                        content={"More"}
                        clickListener={() => { navigation(`/articles/${getArticle.aid}`), scrollToTop() }}
                        element={(<i className='fas fa-external-link-alt'></i>)} />
                    <div className={s.bottom}>
                        <Button
                            className={s.button}
                            clickListener={() => handleScroll(true)}
                            element={(<i className='fas fa-angle-left'></i>)} />
                        <div className={s.pagination}>
                            {news.map((article, index) => {
                                const prevIndex = (ind - 1 + news.length) % news.length
                                const nextIndex = (ind + 1) % news.length
                                if ((index === ind || index === prevIndex || index === nextIndex || ind == 0 && index < 3)) {
                                    return <div
                                        style={{ backgroundImage: `url(${article.urlToImage})` }}
                                        key={index}
                                        className={article.title == getArticle.title ? s.image : `${s.image} ${s.unhighlight}`}
                                        onClick={() => handleScrollToView(index)}> </div>
                                }
                            }
                            )}
                        </div>
                        <Button
                            className={s.button}
                            clickListener={() => handleScroll(false)}
                            element={(<i className='fas fa-angle-right'></i>)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content