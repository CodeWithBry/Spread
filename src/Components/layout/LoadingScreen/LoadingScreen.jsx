import s from './LoadingScreen.module.css';

function LoadingScreen({ visible }) {
  return (
    <div className={`${s.screen} ${!visible ? s.hidden : ''}`} aria-hidden={!visible}>
      <div className={s.brand}>
        <img src="./Icons/logo.png" alt="Spread logo" className={s.logo} />
        <h1 className={s.title}>Spread</h1>
      </div>
      <p className={s.message}>
        Loading resources&hellip;
        <span className={s.spinner} />
      </p>
    </div>
  );
}

export default LoadingScreen;
