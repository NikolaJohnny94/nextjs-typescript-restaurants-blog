import Link from "next/link"
import { CategoriesProp } from "../interfaces/category/cateogries.prop.interface"
import styles from '../styles/CategoryButtonLinks.module.css'

const CategoryButtonLinks = ({ categories }: CategoriesProp) => {

    return (
        <div className={`${styles.div} d-flex justify-content-center`}>
            {categories.map(category => (<Link href={`/category/${category._id}`} key={category._id} passHref><span className={`d-block bg-success text-light mt-4 me-3 p-2`} key={category._id} title={`${category.name} Category`}>{category.name}</span></Link>))}
        </div>
    )
}

export default CategoryButtonLinks
