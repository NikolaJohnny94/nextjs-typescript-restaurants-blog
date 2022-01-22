import { createContext } from 'react'
import { Category } from '../../interfaces/categorycontext.interface'

const CategoryContext = createContext({} as Category)

export default CategoryContext
