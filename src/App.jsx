import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppContext, API_BASE_URL } from './context/AppContext';
import { timeAgo, filterBySearch, toSearchSlug, processArticleData } from './utils/news';

import './styles/globals.css';

import Navbar from './components/layout/Navbar/Navbar';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Breadcrumb from './components/layout/Breadcrumb/Breadcrumb';
import Footer from './components/layout/Footer/Footer';
import LoadingScreen from './components/layout/LoadingScreen/LoadingScreen';

import Home from './pages/Home/Home';
import Latest from './pages/Latest/Latest';
import Articles from './pages/Articles/Articles';
import Search from './pages/Search/Search';
import NotFound from './pages/NotFound/NotFound';

import s from './App.module.css';

const CACHE_KEY = 'newsCache';
const CACHE_TTL_DAYS = 5;

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const navRef = useRef(null);
  const wrapperRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [currentPath, setCurrentPath] = useState('');

  const [worldNews, setWorldNews] = useState([]);
  const [phNews, setPhNews] = useState([]);
  const [searchRecommendations, setSearchRecommendations] = useState(null);

  function scrollToTop() {
    wrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleWrapperScroll(e) {
    if (!navRef.current) return;
    navRef.current.style.boxShadow =
      e.currentTarget.scrollTop > 50 ? 'var(--shadow-md)' : 'var(--shadow-sm)';
  }

  function filterArticles(query) {
    if (!query) { setSearchRecommendations(null); return; }
    const all = [...worldNews, ...phNews];
    setSearchRecommendations(filterBySearch(all, query));
  }

  function navigateToSearch(input) {
    if (!input?.trim()) return;
    navigate(`/search/${toSearchSlug(input)}`);
  }

  async function fetchAndStoreNews() {
    try {
      const res = await fetch(`${API_BASE_URL}/getNews`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const raw = await res.json();
      const { worldNews: wn, phNews: ph } = processArticleData(raw);

      const cache = {
        worldNews: wn,
        phNews: ph,
        dateRequested: new Date().toISOString(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      setWorldNews(wn);
      setPhNews(ph);
    } catch {
      /* silently fail — app remains usable with stale/empty data */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!cached) {
      fetchAndStoreNews();
      return;
    }

    const ageDays = timeAgo(cached.dateRequested).days;
    if (ageDays >= CACHE_TTL_DAYS) {
      fetchAndStoreNews();
      return;
    }

    setWorldNews(cached.worldNews ?? []);
    setPhNews(cached.phNews ?? []);
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const path = url.slice(url.lastIndexOf('/#/') + 2);
    setCurrentPath(path);
    setSearchRecommendations(null);
    setSidebarOpen(false);
  }, [location]);

  const ctx = {
    navigate,
    navRef,
    wrapperRef,
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,
    currentPath,
    worldNews,
    setWorldNews,
    phNews,
    setPhNews,
    searchRecommendations,
    filterArticles,
    navigateToSearch,
    scrollToTop,
    timeAgo,
    processArticleData,
  };

  return (
    <AppContext.Provider value={ctx}>
      <LoadingScreen visible={loading} />
      <div
        className={s.wrapper}
        ref={wrapperRef}
        onScroll={handleWrapperScroll}
      >
        <Navbar />
        <Sidebar />
        <Breadcrumb />
        <main className={s.main}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:articleAID" element={<Articles />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:searchInputParams" element={<Search />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
