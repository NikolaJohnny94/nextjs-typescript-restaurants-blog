import axios from 'axios'
import { useReducer } from 'react'
import CategoryContext from './categoryContext'
import CategoryReducer from './categoryReducer'
import { GET_CATEGORIES } from '../types'

const CategoryState = (props) => {
  const initialState = {
    categories: [],
  }
  const [state, dispatch] = useReducer(CategoryReducer, initialState)



  const getCategories = async () => {
    let categoryNameAndId: any = []

    const res = await axios.get(`${process.env.BASE_URL}/categories`)
    const data = res.data

    data.forEach((category) => {
      const { name, _id } = category
      categoryNameAndId.push({
        _id: _id,
        name: name,
      })
    })

    dispatch({
      type: GET_CATEGORIES,
      payload: categoryNameAndId,
    })
  }

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        getCategories,
      }}>
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryState
