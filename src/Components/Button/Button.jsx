import s from './Button.module.css'

function Button({ className, clickListener, element, content }) {
   return (
      <button
         className={`${s.button} ${className}`}
         onClick={clickListener}>
            {element}{content}
      </button >
   )
}

export default Button