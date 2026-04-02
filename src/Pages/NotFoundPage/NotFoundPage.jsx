import { useContext } from 'react'
import Button from '../../Components/Button/Button'
import s from './NotFoundPage.module.css'
import { AppContext } from '../../App'

function NotFoundPage() {
  const { navigation } = useContext(AppContext)

  return (
    <div className={s.notFound}>
      <div className={s.top}>
        <h1>404 PAGE NOT FOUND!</h1>
        <p>This page doesn't exist or has been deleted.</p>
        <Button
          className={s.button}
          clickListener={() => navigation("/home")}
          content={"Go To Homepage."} />
      </div>
    </div>
  )
}

export default NotFoundPage