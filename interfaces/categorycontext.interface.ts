import { CategoryType } from "./categorytype.interface"

export interface Category {
    categories: CategoryType[]
    getCategories: () => Promise<void>
}