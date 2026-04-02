import LatestSection from './LatestSection/LatestSection'
import s from './Latest.module.css'
import HeroSection from './HeroSection/HeroSection'
import CategoryBar from '../ReusableComponent/CategoryBar/CategoryBar'
import ArticlesSection from '../ReusableComponent/ArticlesSection/ArticlesSection'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'

function Latest({ tabName }) {
  const { categories, worldNews, defineTab } = useContext(AppContext)
  const [selectedCategory, setSelectedCategory] = useState({ category: "General" })

  useEffect(() => {
    if (tabName) {
      defineTab(tabName)
    }
  }, [tabName])

  return (
    <div className={s.latest}>
      <HeroSection />
      <LatestSection worldNews={worldNews} />
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ArticlesSection
        selectedCategory={selectedCategory}
        worldNews={worldNews} />
    </div>
  )
}

export default Latest