import s from './Search.module.css'
import SearchInput from '../../Components/SearchInput/SearchInput'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import ArticleAsCard from '../ReusableComponent/ArticleAsCard/ArticleAsCard'
import { useParams } from 'react-router-dom'

function Search({ tabName }) {
    const { worldNews, phNews, defineTab } = useContext(AppContext)
    const { searchInputParams } = useParams(null)
    const [searchInput, setSearchInput] = useState(searchInputParams)
    const [getResults, setGetResults] = useState()

    useEffect(() => {
        if (searchInputParams && worldNews && phNews) {
            const articles = [...worldNews, ...phNews]
            const searchInArticles = articles.filter((article) => (
                article.description.toLowerCase().includes(
                    searchInputParams.toLowerCase()
                )
                || article.title.toLowerCase().includes(
                    searchInputParams.toLowerCase()
                )
            ))
            console.log(searchInArticles, worldNews, phNews, searchInputParams)
            setGetResults([...searchInArticles])
        } else {
            setSearchInput(null)
        }
    }, [searchInputParams, worldNews, phNews])

    useEffect(() => {
        if (tabName) {
            defineTab(tabName)
        }
    }, [tabName])

    return (
        <div className={s.search}>
            <SearchInput
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                className={`${s.searchWrapper}`} />
            <div className={s.results}>
                {searchInputParams && getResults?.map(article => {
                    return <ArticleAsCard article={article} className={`${s.article}`} />
                })}
            </div>
        </div>
    )
}

export default Search