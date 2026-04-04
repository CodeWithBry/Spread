import s from './Spinner.module.css';

function Spinner({ size = 28 }) {
  return (
    <span
      className={s.spinner}
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}

export default Spinner;
