import { useContext } from "react"
import Button from "../../../Components/Button/Button"
import s from "./CategoryBar.module.css"
import { AppContext } from "../../../App"

function CategoryBar({ categories, selectedCategory, setSelectedCategory }) {


    function handleSelection(index) {
        setSelectedCategory({...categories[index]}) // handles the selected Index of the mapped category.
    }

    return (
        <div className={s.categoryBar}>
            <h3>Categories: </h3>
            {categories.map((category, index) => {
                return <Button 
                    className={ category.category == selectedCategory.category 
                        ? s.category 
                        : `${s.category} ${s.notSelected}`} 
                    clickListener={()=>handleSelection(index)} 
                    content={category.category}/>
            })}
        </div>
    )
}

export default CategoryBar