import s from './NavigationBar.module.css'
import {AppContext} from '../../App'
import { useContext } from 'react'
import LinkTag from '../../Components/LinkTag/LinkTag'
import Button from '../../Components/Button/Button'

function NavigationBar() {
  const { tabs, navigation, hideSideBar, setHideSideBar, defineTab, navRef } = useContext(AppContext)

  return (
    <nav className={s.nav} ref={navRef}>
      <div className={s.left}>
        <h1 onClick={() => {navigation("/")}}> <img src="./Icons/logo.png" alt="Logo Image"/> Spread</h1>
        <ul className={s.links}>
          {tabs?.map((tab, i) => {
            if (i <= 3) 
              return <LinkTag 
                        path={tab?.path} 
                        className={`${s.link} ${tab.isSelected && s.highlight}`} 
                        content={tab.name} 
                        clickListener={()=>defineTab(tab.name)}/>
          })}
        </ul>
      </div>

      <Button 
        className={s.hamburgerButton} 
        element={(<i className={!hideSideBar ? "	fa fa-close" : 'fas fa-bars'}></i>)}
        clickListener={()=>setHideSideBar(prev => prev ? false : true)}/>
    </nav>
  )
}

export default NavigationBar