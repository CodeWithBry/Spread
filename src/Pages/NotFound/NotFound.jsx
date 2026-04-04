import { useNavigate } from 'react-router-dom';
import s from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={s.page}>
      <div className={s.content}>
        <span className={s.code}>404</span>
        <h1 className={s.heading}>Page Not Found</h1>
        <p className={s.message}>
          This page doesn&apos;t exist or may have been removed.
        </p>
        <button className={s.btn} onClick={() => navigate('/home')}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;
