import { useContext, useEffect, useState } from 'react'
import ArticlesSection from '../ReusableComponent/ArticlesSection/ArticlesSection'
import s from './Articles.module.css'
import HeroSection from './HeroSection/HeroSection'
import { AppContext } from '../../App'
import { useParams } from 'react-router-dom'
import Article from './Article/Article'
import Button from '../../Components/Button/Button'
import { URL_API } from '../../App'

function Articles({ tabName }) {
  const { categories, phNews, worldNews, defineTab, processArticles } = useContext(AppContext)
  const { articleAID } = useParams()
  // NUMS AND BOOLEANS
  const [loading, setLoading] = useState(false)
  const [numOfRequest, setNumOfResquest] = useState(0)
  // OBJECTS AND ARRAYS
  const [article, setArticle] = useState(null)
  const [newlyAddedNews, setNewlyAddedNews] = useState(null)

  async function generateArticles() {
    try {
      setNumOfResquest(prev => prev + 1)
      const getResponse = await fetch((`${URL_API}/loadMoreNews`), {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const articles = await processArticles(getResponse, false)
      setNewlyAddedNews([...articles.worldNews, ...articles.phNews])
      await saveArticlesToServer({ worldNews: [...articles.worldNews], phNews: [...articles.phNews] })
      setLoading(false)
    } catch (error) {
      window.alert(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (articleAID != null && worldNews.length != 0 && phNews.length != 0) {
      const articles = [...phNews, ...worldNews]
      for (let i = 0; i < articles.length; i++) {
        if (articles[i]?.aid?.toLowerCase() == articleAID.toLowerCase()) {
          setArticle(articles[i])
        }
      }
    } else {
      setArticle(null)
    }
  }, [articleAID, phNews, worldNews])

  useEffect(() => {
    if (tabName) {
      defineTab(tabName)
    }
  }, [tabName])

  return (
    <div className={s.articles}>
      <HeroSection />
      {article && <Article article={article} />}
      {categories?.map((category) => {
        return <ArticlesSection
          selectedCategory={{ category: category.category }}
          sectionType={"Philippines"}
          phNews={[...phNews, ...worldNews]}
          id={category.category} />
      })}
      {newlyAddedNews && <ArticlesSection
        sectionType={"Discover"}
        phNews={[...newlyAddedNews]} />}
      <Button
        className={
          numOfRequest != 1 ?
            loading ? `${s.button} ${s.hideButton}` : s.button :
            s.hide
        }
        clickListener={() => { setLoading(true), generateArticles(loading) }}
        content={"Read More"} />
    </div>
  )
}

export default Articles