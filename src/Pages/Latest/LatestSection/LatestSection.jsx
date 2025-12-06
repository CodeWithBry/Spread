import ArticleAsCard from '../../ReusableComponent/ArticleAsCard/ArticleAsCard'
import Banner from './Banner/Banner'
import s from './LatestSection.module.css'
import { useContext, useRef  } from 'react'
import { AppContext } from '../../../App'

function LatestSection() {
    const {worldNews} = useContext(AppContext)
    const sliderRef = useRef()


    function handleSlide(bool) {
        const scrollAmount = Math.ceil(sliderRef.current.clientWidth); // or sliderRef.current.clientWidth
        const currentScroll = Math.ceil(sliderRef.current.scrollLeft);
        const totalScroll = Math.ceil(sliderRef.current.scrollWidth)

        if (!bool) {
            // Scroll to the right
            if (scrollAmount + currentScroll >= totalScroll) {
                sliderRef.current.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });
            } else {
                sliderRef.current.scrollTo({
                    left: currentScroll + scrollAmount,
                    behavior: "smooth"
                });
            }
        } else {
            // Scroll to the left
            if (currentScroll - scrollAmount <= 0) {
                sliderRef.current.scrollTo({
                    left: totalScroll - scrollAmount,
                    behavior: "smooth"
                });
            } else {
                sliderRef.current.scrollTo({
                    left: currentScroll - scrollAmount,
                    behavior: "smooth"
                });
            }
        }
    }

    return (
        <div className={s.latestSection}>
            <div className={s.left}>
                <div className={s.wrapper}>
                    
                    <div className={s.slider} ref={sliderRef}>
                        {worldNews?.map(article => {
                            return <Banner article={article} handleSlide={handleSlide}/>
                        })}
                    </div>
                </div>

            </div>
            <div className={s.right}>
                <div className={s.wrapper}>
                    <h3>Articles</h3>
                    {worldNews?.map((article) => {
                        return <ArticleAsCard article={article} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default LatestSection