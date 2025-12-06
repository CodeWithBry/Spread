import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import s from './BreadCrumb.module.css'
import LinkTag from '../LinkTag/LinkTag'

function BreadCrumb() {
  const { path } = useContext(AppContext)
  const [pathParts, setPathParts] = useState([])


  useEffect(() => {
    if (path) {
      setPathParts(path.split("/"))
    }
  }, [path])

  useEffect(() => {
    if (pathParts) {
      console.log(pathParts)
    }
  }, [pathParts])

  if(pathParts.length != 1)return (
    <div className={s.breadCrumb}>
      {
        pathParts?.map((str, index) => {
          if(str != "")return <span>
            /
            <LinkTag
              className={s.link}
              path={index != pathParts.length - 1
                ? path.slice(0, path.indexOf(`/${pathParts[index + 1]}`))
                : null}
              content={str} />
          </span>
        })
      }
    </div>
  )
}

export default BreadCrumb