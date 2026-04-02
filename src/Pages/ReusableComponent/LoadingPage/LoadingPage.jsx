import s from './LoadingPage.module.css'

function LoadingPage({loading}) {
  return (
      <div className={loading ? s.loadingPage : `${s.loadingPage} ${s.hide}`}>
        <div className={s.title}>
            <img src="./Icons/logo.png" alt="website_logo" />
            <h1>Spread</h1>
        </div>
        <p id={s.loadingPar}>
            Loading Resources...
            <div id={s.loader}></div>
        </p>
    </div>
  )
}

export default LoadingPage