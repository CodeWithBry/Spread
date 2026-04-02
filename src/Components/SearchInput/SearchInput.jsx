import { useContext, useState } from 'react'
import { AppContext } from "../../App"
import s from './SearchInput.module.css'
import Button from '../Button/Button'
import Results from './Results'

function SearchInput({ searchInput, setSearchInput, hide, className }) {
    const { searchRecoms, handleToSearchTab } = useContext(AppContext)
    const [hideResults, setHideResults] = useState(true)

    return (
        <div className={`${s.searchWrapper} ${className}`} onBlur={() => {
            setTimeout(() => {
                setHideResults(true)
            }, 200);
        }}>
            <div className={s.searchInput}>
                <i className={`fa fa-search ${s.searchIcon}`}></i>
                <input
                    type="text"
                    placeholder='Type to text...'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key == "Enter" && handleToSearchTab(searchInput)}
                    onInput={() => setHideResults(false)} />
                <i className={`fa fa-close ${searchInput ? s.clear : s.hide}`} onClick={() => { setSearchInput("") }}></i>

                {!hideResults && !hide && <Results searchRecoms={searchRecoms} hideResults={hideResults} />}
            </div>
            <Button
                className={s.button}
                clickListener={() => handleToSearchTab(searchInput)}
                content={"Search"}>
            </Button>
        </div>
    )
}

export default SearchInput