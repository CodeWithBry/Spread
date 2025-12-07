import s from './Button.module.css'

function Button({ className, clickListener, element, content, disabled }) {
   return (
      <button
         className={`${s.button} ${className}`}
         disabled={disabled}
         onClick={(e) => clickListener(e)}>
            {element}{content}
      </button >
   )
}

export default Button