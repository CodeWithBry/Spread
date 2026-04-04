import s from './Button.module.css';

function Button({ className, onClick, children, disabled, type = 'button' }) {
  return (
    <button
      type={type}
      className={`${s.button} ${className ?? ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
