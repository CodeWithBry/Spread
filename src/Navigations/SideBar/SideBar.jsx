import { useContext } from 'react'
import s from './SideBar.module.css'
import { AppContext } from '../../App'
import LinkTag from '../../Components/LinkTag/LinkTag';
import Button from '../../Components/Button/Button';

function SideBar() {
   const { hideSideBar, setHideSideBar, categories, tabs, defineTab, wrapperRef, navigation } = useContext(AppContext)

   function handleNavigation(category) {
      navigation("/articles")
      setTimeout(() => {
         const parEl = wrapperRef.current
         const section = parEl.querySelector(`#${category}`)
         section.scrollIntoView({ behavior: "smooth" })
         setHideSideBar(true)
      }, 500);
   }

   return (
      <div className={!hideSideBar ? s.dropDown : `${s.dropDown} ${s.hideDropDown}`}>
         <div className={s.blank} onClick={()=>setHideSideBar(true)}></div>
         <div className={s.wrapper}>
            <h3 className={s.tabHeadline}>Tabs</h3>
            <ul className={s.linkLists}>
               {tabs?.map((tab, i) => {
                  if (i <= 3)
                     return <LinkTag
                        path={tab?.path}
                        className={`${s.link} ${tab.isSelected && s.highlight}`}
                        content={tab.name}
                        clickListener={() => (defineTab(tab.name))} />
               })}
            </ul>
            <h3>Categories</h3>
            <ul className={s.categoriesLists}>
               {categories.map(cat => {
                  return <Button
                     content={cat.category}
                     className={s.link}
                     clickListener={() => handleNavigation(cat.category)} />
               })}
            </ul>
         </div>
      </div>
   )
}

export default SideBar