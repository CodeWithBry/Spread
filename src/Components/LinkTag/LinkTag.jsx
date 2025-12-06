import { Link } from 'react-router-dom'
import s from './LinkTag.module.css'
import { useContext } from 'react'
import { AppContext } from "../../App"

function LinkTag({ className, path, element, content, clickListener }) {
    const { scrollToTop } = useContext(AppContext)

    return (
        <Link
            className={`${s.link} ${className}`}
            onClick={() => { clickListener, scrollToTop() }}
            to={path}>
            {element}{content}
        </Link>
    )
}

export default LinkTag