import { createContext, useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import s from './App.module.css'

// PAGES

import Home from './Pages/Home/Home';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import NavigationBar from './Navigations/NavigationBar/NavigationBar';
import SideBar from './Navigations/SideBar/SideBar';
import Footer from './Navigations/Footer/Footer';
import BreadCrumb from './Components/BreadCrumb/BreadCrumb';
import Articles from './Pages/Articles/Articles';
import Search from './Pages/Search/Search';
import Latest from './Pages/Latest/Latest';
import LoadingPage from './Pages/ReusableComponent/LoadingPage/LoadingPage';

export const AppContext = createContext();
export const URL_API = import.meta.env.MODE === "development"
   ? "http://localhost:3000/api" // Local backend
   : "https://spread-m5ja.onrender.com/api"; // Render backend // Render backend

function App() {
   // REUSABLE VARIABLES
   const location = useLocation()
   const navigation = useNavigate()
   // REFS
   const navRef = useRef(null)
   const wrapperRef = useRef()
   // BOOLEANS
   const [hideSideBar, setHideSideBar] = useState(true)
   const [loading, setLoading] = useState(true)
   // NUMERICAL VALUES 
   // STRINGS
   const [path, setPath] = useState("")
   // ARRAYS && OBJECTS
   const [tabs, setTabs] = useState([
      { name: "Home", element: Home, path: `/home`, isSelected: true },
      { name: "Latest", element: Latest, path: `/latest`, isSelected: false },
      { name: "Articles", element: Articles, path: `/articles`, isSelected: false },
      { name: "Search", element: Search, path: `/search`, isSelected: false },
      { name: "Articles", element: Articles, path: `/articles/:articleAID`, isSelected: false },
      { name: "Search", element: Search, path: `/search/:searchInputParams`, isSelected: false },
      { name: "NotFoundPage", element: NotFoundPage, path: `*`, isSelected: false },
   ])
   const [categories, setCategories] = useState([
      { category: "General", path: "/category/general" },
      { category: "Technology", path: "/category/technology" },
      { category: "Sports", path: "/category/sports" },
      { category: "Business", path: "/category/business" },
      { category: "Entertainment", path: "/category/entertainment" },
      { category: "Health", path: "/category/health" },
      { category: "Science", path: "/category/science" },
      { category: "Politics", path: "/category/politics" }
   ]);
   const [searchResults, setSearchResults] = useState(null)
   const [searchRecoms, setSearchRecoms] = useState(null)
   const [worldNews, setWorldNews] = useState([])
   const [phNews, setPHNews] = useState([])
   // REUSABLE FUNCTIONS
   function defineTab(tabName) {
      setHideSideBar(true)
      setTabs(prev => {
         const updatedTabs = prev.map(tab => ({ ...tab, isSelected: tab.name == tabName ? true : false }))
         return [...updatedTabs]
      })
   }

   function handleWrapperScroll(element) {
      const nav = navRef.current
      const el = element
      if (el.scrollTop > 50) {
         nav.style.boxShadow = "0 0 10px -5px black"
      } else nav.style.boxShadow = null
   }

   function scrollToTop() {
      const element = wrapperRef.current
      element.scrollTo({ top: 0, behavior: "smooth" })
   }

   function dateConversion(dateString) {
      const now = new Date();
      const past = new Date(dateString);
      const diffMs = now - past;

      const seconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (seconds < 60) return ["just now", days];
      if (minutes < 60) return [`${minutes} minute${minutes > 1 ? 's' : ''} ago`, days];
      if (hours < 24) return [`${hours} hour${hours > 1 ? 's' : ''} ago`, days];
      if (days < 7) return [`${days} day${days > 1 ? 's' : ''} ago`, days];
      if (weeks < 4) return [`${weeks} week${weeks > 1 ? 's' : ''} ago`, days];
      if (months < 12) return [`${months} month${months > 1 ? 's' : ''} ago`, days];
      return [`${years} year${years > 1 ? 's' : ''} ago`, days];
   }

   function filterArticles(searchInput) {
      const articles = [...worldNews, ...phNews]
      const searchInArticles = articles.filter((article) => (
         article.description.toLowerCase().includes(
            searchInput.toLowerCase()
         )
         || article.title.toLowerCase().includes(
            searchInput.toLowerCase()
         )
      ))

      return [...searchInArticles]
   }

   function handleSearch(searchInput) {
      if (searchInput == "") return setSearchResults(null);
      const searches = filterArticles(searchInput)
      setSearchRecoms([...searches])
   }

   function handleToSearchTab(searchInput) {
      navigation(`/search/${searchInput.split(" ").filter(str => str != "").join("_")}`)
   }

   async function processArticles(response, saveToLocalStorage) {
      // if(response data is not in json format ? then don't enchain with .json() method)
      const data = !response?.worldNews ? (await response.json()) : response
      const filteredWorldNews = data?.worldNews?.filter(article => article.urlToImage != null && article.description != null)
      const filteredPHNews = data?.phNews?.filter(article => article.urlToImage != null && article.description != null)

      const changedWorldNews = filteredWorldNews.map(article => ({ ...article, aid: crypto.randomUUID() }))
      const changedPHNews = filteredPHNews?.map(article => ({ ...article, aid: crypto.randomUUID() }))

      const newsCache = {
         worldNews: [...changedWorldNews],
         phNews: changedPHNews ? [...changedPHNews] : null,
         dateRequested: new Date().toISOString(),
         requestLimit: 1
      }

      if (saveToLocalStorage) {
         localStorage.setItem("newsCache", JSON.stringify(newsCache))
         setWorldNews([...changedWorldNews])
         changedWorldNews && setPHNews([...changedPHNews])
      }


      return {
         worldNews: [...changedWorldNews],
         phNews: changedPHNews && [...changedPHNews]
      }
   }

   async function getNews() {
      try {
         const getResponse = await fetch((`${URL_API}/getNews`), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
         });await processArticles(getResponse, true)
         setTimeout(() => {
            setLoading(false)
         }, 3000);
      } catch (error) {
         console.log(error)
      }
   }

   // EFFECTS
   useEffect(() => {
      function getPath() {
         const url = window.location.href
         const pathURL = url.slice(url.lastIndexOf("/#/") + 2)
         setPath(pathURL)
      }
      if (location) {
         setSearchResults(null)
         getPath()
      }
   }, [location])

   useEffect(() => {
      const newsCache = JSON.parse(localStorage.getItem("newsCache"))

      if (newsCache == null) {
         getNews()
      } else {
         if(dateConversion(newsCache.dateRequested)[1] >= 5) return getNews()


         setTimeout(() => {
            setLoading(false)
            setWorldNews([...newsCache?.worldNews])
            setPHNews([...newsCache?.phNews])
         }, 2000);
      }

   }, [])

   // CONTEXT VARIABLE 
   const variables = {
      // REUSABLE VARIABLES
      navigation,
      // REFS
      navRef, wrapperRef,
      // BOOLEANS
      hideSideBar, setHideSideBar,
      loading, setLoading,
      // NUMERICAL VALUES

      // STRINGS
      path,
      // ARRAYS && OBJECTS
      tabs, setTabs,
      categories, setCategories,
      worldNews, setWorldNews,
      phNews, setPHNews,
      searchResults, setSearchResults,
      searchRecoms, setSearchRecoms,
      // FUNCTIONS
      defineTab, scrollToTop,
      dateConversion, handleSearch,
      handleToSearchTab, filterArticles,
      processArticles
   }


   return <>
      <AppContext.Provider value={variables}>
         <LoadingPage loading={loading} />
         <div className={s.wrapper} ref={wrapperRef} onScroll={(e) => handleWrapperScroll(e.currentTarget)}>
            <NavigationBar />
            <SideBar />
            <BreadCrumb />
            <Routes>
               {tabs.map((tab) => {
                  const PageComponent = tab.element
                  const props = tab.name
                  return <Route path={tab.path} element={(<><PageComponent tabName={props} /></>)} />
               })}
               <Route path={'/search/:searchInputParams'} element={(<><Search /></>)} />
            </Routes>
            <Footer />
         </div>

      </AppContext.Provider>
   </>
}
export default App
