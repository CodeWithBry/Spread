import s from './cardSkeleton.module.css'

function CardSkeleton(props) {
  return (
    <div className={`${s.cardSkeleton} ${props.className}`}>cardSkeleton</div>
  )
}

export default CardSkeleton