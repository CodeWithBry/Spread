import { useContext } from 'react'
import s from './SearchInput.module.css'
import { AppContext } from "../../App"
import LinkTag from '../LinkTag/LinkTag'

function Results({ searchRecoms, hideResults }) {
    const { navigation } = useContext(AppContext)

    if (searchRecoms?.length != 0 && searchRecoms != null) {
        return (
            <div className={hideResults ? s.hideResults : s.results}>
                {searchRecoms?.map(article => {
                    return <LinkTag
                        key={article.aid}
                        className={s.textWrapper}
                        path={`/articles/${article.aid}`}
                        content={(<span className={s.text}>{article.title}</span>)}>
                        
                    </LinkTag>
                })}
            </div>
        )
    }
}

export default Results