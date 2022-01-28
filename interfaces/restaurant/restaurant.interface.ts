import { RestaurantImage } from "./restaurant.image.interface"
import { RestaurantCategory } from "./restaurant.category"
import { Review } from "./review.interface"

export interface Restaurant {
    images: RestaurantImage[],
    categories: RestaurantCategory[],
    _id: string,
    name: string,
    description: string,
    published_at: string,
    createdAt: string,
    updatedAt: string,
    __v: number
    reviews: Review[],
    id: string
}