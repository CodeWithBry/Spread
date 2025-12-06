import { AppContext } from '../../App'
import { useContext, useEffect, useState } from 'react'
import s from './Home.module.css'
import Button from '../../Components/Button/Button'
import HeroSection from './HeroSection/HeroSection'
import LatestSection from './LatestSection/LatestSection'
import ArticlesSection from '../ReusableComponent/ArticlesSection/ArticlesSection'
import CategoryBar from '../ReusableComponent/CategoryBar/CategoryBar'

function Home({ tabName }) {
  const { categories, worldNews, phNews, defineTab, navigation, scrollToTop } = useContext(AppContext)
  const [selectedCategory, setSelectedCategory] = useState({ category: "General" })

  useEffect(() => {
    if (tabName) {
      defineTab(tabName)
    }
  }, [tabName])

  return (
    <div className={s.home}>
      <HeroSection />
      <LatestSection
        worldNews={worldNews} />
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ArticlesSection
        selectedCategory={selectedCategory}
        worldNews={worldNews} />
      <ArticlesSection
        sectionType={"Philippines"}
        phNews={phNews} />
      <Button
        className={s.button}
        clickListener={() => (scrollToTop(), navigation("/articles"))}
        content={"Read More"} />
    </div>
  )
}

export default Home