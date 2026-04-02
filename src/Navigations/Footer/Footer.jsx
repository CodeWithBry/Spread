import { useContext, useState } from 'react'
import s from './Footer.module.css'
import { Link } from 'react-router-dom'
import LinkTag from '../../Components/LinkTag/LinkTag'
import Button from '../../Components/Button/Button'
import { AppContext } from '../../App'

function Footer() {
   const {scrollToTop} = useContext(AppContext)
   const [groups, setGroups] = useState([
      {
         name: "Site Map",
         links: [
            { name: "Homepage", link: "/home" },
            { name: "Latest", link: "/latest" },
            { name: "Articles", link: "/articles" },
            { name: "Search", link: "/search" },
         ]
      },
      {
         name: "Legal",
         links: [
            { name: "Privacy Policy", link: "/" },
            { name: "Terms Of Service", link: "/" },
            { name: "FAQs", link: "/" },
         ]
      }
   ])
   const socialMediaLinks = [
      { icon: "fab fa-facebook", link: "https://facebook.com" },
      { icon: "fab fa-instagram", link: "https://instagram.com" },
      { icon: "fab fa-twitter", link: "https://twitter.com/" },
      { icon: "fas fa-phone-alt", link: "" }
   ]

   return (
      <div className={s.footer}>
         <div className={s.top}>
            <div className={s.left}>
               <div className={s.wrapper}>
                  <h2>
                     <img src="./Icons/logo.png" alt="Image Logo" />
                     Spread
                  </h2>
                  <p>
                     We are committed to delivering accurate, timely, and engaging stories that keep you informed and inspired every day.
                  </p>
                  <div className={s.socialMedia}>
                     {socialMediaLinks.map(link => (
                        <LinkTag
                           className={s.link}
                           element={<i className={link.icon}></i>}
                           path={link.link} />
                     ))}
                  </div>
                  <Button 
                     clickListener={scrollToTop}
                     className={s.backToTop}
                     content={"Back To Top"}/>
               </div>
            </div>
            <div className={s.right}>
               <div className={s.wrapper}>
                  {groups.map(group => {
                     return <div className={s.list}>
                        <p>{group.name}</p>
                        <div className={s.group}>
                           {group.links.map(link => {
                              return <LinkTag
                                 className={s.link}
                                 path={`/`}
                                 content={link.name} />
                           })}
                        </div>
                     </div>
                  })}
               </div>
            </div>
         </div>
         <div className={s.bottom}>
            <p>
               © 2025 Spread. All rights reserved.
            </p>
         </div>
      </div>
   )
}

export default Footer