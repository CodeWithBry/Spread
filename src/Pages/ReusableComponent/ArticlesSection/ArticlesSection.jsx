import s from './ArticlesSection.module.css'
import Article from '../Article/Article'
import LinkTag from '../../../Components/LinkTag/LinkTag'
import { useEffect, useState } from 'react'

function ArticlesSection({ selectedCategory, sectionType, worldNews, phNews, id }) {
    const [filteredWorldNews, setFilteredWorldNews] = useState([])
    const [filteredPHNews, setFilteredPHNews] = useState([])

    useEffect(() => {
        if (worldNews != null) {
            if (selectedCategory?.category.toLowerCase() != "general" && selectedCategory != null) {
                setFilteredWorldNews([...worldNews.filter(article => article.category.toLowerCase() == selectedCategory?.category?.toLowerCase())])
            } else {
                setFilteredWorldNews([...worldNews])
            }
        }
    }, [worldNews, selectedCategory])

    useEffect(() => {
        if (phNews != null) {
            if (selectedCategory?.category.toLowerCase() != "general" && selectedCategory != null) {
                setFilteredPHNews([...phNews.filter(article => article.category.toLowerCase() == selectedCategory?.category?.toLowerCase())])
            } else {
                setFilteredPHNews([...phNews])
            }
        }
    }, [phNews, selectedCategory])

    return (
        <div className={s.articlesSection} id={id}>
            <div className={s.top}>
                <i className='fas fa-layer-group'></i>
                <div className={s.title}>
                    <h1>
                        {selectedCategory != null
                            ? selectedCategory?.category
                            : sectionType}
                    </h1>
                    <LinkTag
                        className={s.link}
                        content={"To Articles"}
                        path={`/Articles`}
                        element={(<i className='fas fa-external-link-alt'></i>)} />
                </div>
            </div>
            <div className={s.bottom}>
                {
                    filteredWorldNews.length != 0 ?
                        worldNews && filteredWorldNews?.map((article) => <Article
                        key={Math.random() * 1}
                        article={article}
                            selectedCategory={selectedCategory} />) :
                        worldNews && <h3>There is no posted article here!</h3>
                }
                {
                    filteredPHNews.length != 0 ?
                        phNews && filteredPHNews?.map((article) => <Article
                            key={Math.random() * 1}
                            article={article}
                            selectedCategory={selectedCategory} />) :
                        phNews && <h3>There is no posted article here!</h3>
                }
            </div>


        </div>
    )
}

export default ArticlesSection