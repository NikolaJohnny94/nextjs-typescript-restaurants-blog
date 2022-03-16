import axios, { AxiosResponse } from 'axios'
import { useContext } from 'react'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useRouter, NextRouter } from 'next/router'
import ImageContext from '../../../context/imgs/imageContext'
import { StaticPaths } from '../../../interfaces/other/static.paths.interface'
import { Restaurant } from '../../../interfaces/restaurant/restaurant.interface'
import { Review } from '../../../interfaces/restaurant/review.interface'
import { PersonReview } from '../../../interfaces/person/person.review.interface'
import { Person } from '../../../interfaces/person/person.interface'
import { Category } from '../../../interfaces/category/category.interface'
import { Image } from '../../../interfaces/imgs/image.interface'
import Layout from '../../../components/Layout'
import PersonCard from '../../../components/PersonCard'
import CarouselComponent from '../../../components/CarouselComponent'
import ReviewContainer from '../../../components/ReviewContainer'
import CategoryButtonLinks from '../../../components/CategoryButtonLinks'
import { Button } from 'react-bootstrap'
import styles from '../../../styles/Restaurant.module.css'

const Restaurant: NextPage = ({ restaurant, HeadProps, categories, personsReviews }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const router: NextRouter = useRouter()

    const imageContext: Image = useContext(ImageContext)
    const { restaurantPage } = imageContext.images

    return (
        <Layout categories={categories} title={HeadProps.title} description={HeadProps.metas[0].content} imgURL={restaurantPage}>
            <div className={styles.div}>
                <h1 className='text-center m-3'><em>{restaurant.name}</em></h1>
                <CarouselComponent images={restaurant.images} />
                <CategoryButtonLinks categories={restaurant.categories} />
                <div className="ms-1 mt-3 mb-3 me-1"><strong>Description: </strong>{restaurant.description}</div>
                <h2 className="ms-1 mt-3 mb-3">Reviews:</h2>
                <ReviewContainer>
                    {personsReviews.map(review => <PersonCard key={review.id} review={review.review} published={review.published} person={review.person} imgURL={review.imgURL} />)}
                    <Button className='mt-3 me-2 ms-2' variant='danger' onClick={() => router.back()}>Back</Button>
                </ReviewContainer>
            </div>

        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
    const RestaurantsResponse: AxiosResponse<Restaurant[]> = await axios.get(`${process.env.BASE_URL}/restaurants`)
    let currentRestaurantID: any

    RestaurantsResponse.data.forEach(restaurant => {
        if (ctx.params.slug === restaurant.name.replace(' ', '-').toLowerCase()) {
            currentRestaurantID = restaurant.id
        }
    })
    const restaurantResponse: AxiosResponse<Restaurant> = await axios.get(`${process.env.BASE_URL}/restaurants/${currentRestaurantID}`)
    const restaurant: Restaurant = restaurantResponse.data

    const reviews: Review[] = restaurant.reviews

    let personsReviews: PersonReview[] = []

    reviews.forEach(async (reviewByPerson): Promise<void> => {
        const { persons, review, published_at } = reviewByPerson

        let personResponse: AxiosResponse<Person> = await axios.get(`${process.env.BASE_URL}/persons/${persons}`)
        let person: Person = personResponse.data
        let imgURL: string = personResponse.data.profile_image.name

        personsReviews.push({
            id: persons,
            review: review,
            published: published_at,
            person: person,
            imgURL: imgURL
        })
    })

    const categoriesResponse: AxiosResponse<Category[]> = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories: Category[] = categoriesResponse.data

    return {
        props: {
            restaurant,
            categories,
            reviews,
            personsReviews,
            HeadProps: {
                title: `${restaurant.name} 🍴👨‍🍳 | Next.js ▶️ & Strapi.io App 🚀`,
                metas: [
                    {
                        name: 'description',
                        content: `${restaurant.name} | Restaurants blog made with Next.js ▶️ TypeScript 📜 and ReactBootstrap ⚛️🥾 | ${restaurant.description.substring(0, 56)}`,
                    },

                ],
            },
            revalidate: 1
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res: AxiosResponse<Restaurant[]> = await axios.get(`${process.env.BASE_URL}/restaurants/`)
    const restaurants: Restaurant[] = res.data
    const slugs: string[] = restaurants.map(restaurant => restaurant.name.replace(' ', '-').toLowerCase())
    const paths: StaticPaths[] = slugs.map(slug => ({ params: { slug: slug.toString() } }))
    return {
        paths,
        fallback: false,
    }
}

export default Restaurant