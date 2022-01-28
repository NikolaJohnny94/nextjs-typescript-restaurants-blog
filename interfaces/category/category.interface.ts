import { Restaurant } from "../restaurant/restaurant.interface"

export interface Category {
    _id: string,
    name: string,
    published_at: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
    restaurants: Restaurant[],
    id: string
}