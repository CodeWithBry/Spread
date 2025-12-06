import s from './LatestSection.module.css'
import LinkTag from "../../../Components/LinkTag/LinkTag"
import { useEffect, useRef, useState } from 'react'
import Content from './Content/Content'
function LatestSection({ worldNews }) {
    const [news, setNews] = useState(null)
    const wrapperRef = useRef()

    function handleScroll(bool) {
        const scrollAmount = Math.ceil(wrapperRef.current.clientWidth); // or wrapperRef.current.clientWidth
        const currentScroll = Math.ceil(wrapperRef.current.scrollLeft);
        const totalScroll = Math.ceil(wrapperRef.current.scrollWidth)

        if (!bool) {
            // Scroll to the right
           if(scrollAmount + currentScroll >= totalScroll) {
               wrapperRef.current.scrollTo({
                   left: 0,
                   behavior: "smooth"
               });
           } else {
               wrapperRef.current.scrollTo({
                   left: currentScroll + scrollAmount,
                   behavior: "smooth"
               });
           }
        } else {
            // Scroll to the left
            if (currentScroll - scrollAmount <= 0) {
                wrapperRef.current.scrollTo({
                    left: totalScroll - scrollAmount,
                    behavior: "smooth"
                });
            } else {
                wrapperRef.current.scrollTo({
                    left: currentScroll - scrollAmount,
                    behavior: "smooth"
                });
            }
        }
    }

    useEffect(() => {
        if (worldNews.length != 0) {
            setNews([...worldNews])
        }
    }, [worldNews])

    if (news != null) return (
        <div className={`${s.latest}`}>
            <div className={s.top}>
                <i className='fas fa-sync-alt'></i>
                <div className={s.title}>
                    <h1>Latest News</h1>
                    <LinkTag
                        className={s.button}
                        content={"To Latest"}
                        element={(<i className='fas fa-external-link-alt'></i>)} />
                </div>
            </div>
            <div className={s.wrapper} ref={wrapperRef}>
                {news?.map((article, ind) => {
                    return <Content
                        handleScroll={handleScroll}
                        news={news}
                        setNews={setNews}
                        articleData={article}
                        ind={ind}
                        wrapperRef={wrapperRef} />
                })}
            </div>
        </div>
    )
}

export default LatestSection