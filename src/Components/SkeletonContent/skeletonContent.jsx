import s from './SkeletonContent.module.css'

function SkeletonContent(props) {
  return (
    <div className={`${s.skeletonContent} ${props.className}`}>SkeletonContent</div>
  )
}

export default SkeletonContent