import { useState } from 'react'
import SearchInput from '../../../Components/SearchInput/SearchInput'
import s from './HeroSection.module.css'

function HeroSection() {
    const [searchInput, setSearchInput] = useState("")
    return (
        <div className={s.heroSection}>
            <div className={s.top}>
                <h1>Read Articles</h1>
                <p>Breaking news and comprehensive coverage of international events, global politics, and worldwide developments</p>
            </div>
            <div className={s.bottom}>
                <SearchInput
                    searchInput={searchInput}
                    setSearchInput={setSearchInput} />
            </div>
        </div>
    )
}

export default HeroSection