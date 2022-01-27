import axios from 'axios'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useRouter, NextRouter } from 'next/router'
import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import ImageContext from '../../../context/imgs/imageContext'
import { StaticPaths } from '../../../interfaces/staticpaths.interface'
import { StaticPathsResponse } from '../../../interfaces/staticpathsresponse.interface'
import { RestaurantReview } from '../../../interfaces/restaurantreview.interface'
import Layout from '../../../components/Layout'
import CarouselComponent from '../../../components/CarouselComponent'
import ReviewContainer from '../../../components/ReviewContainer'
import CategoryButtonLinks from '../../../components/CategoryButtonLinks'
import styles from '../../../styles/Restaurant.module.css'
import PersonCard from '../../../components/PersonCard'



const Restaurant: NextPage = ({ restaurant, HeadProps, categories, restaurantReviews }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router: NextRouter = useRouter()
    const imageContext = useContext(ImageContext)
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
                    {restaurantReviews.map(review => <PersonCard key={review.id} review={review.review} published={review.published} person={review.person} imgURL={review.imgURL} />)}
                    <Button className='mt-3 me-2 ms-2' variant='danger' onClick={() => router.back()}>Back</Button>
                </ReviewContainer>
            </div>

        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {

    const restaurantResponse = await axios.get(`${process.env.BASE_URL}/restaurants/${ctx.params.id}`)
    const restaurant = restaurantResponse.data

    const reviews = restaurant.reviews

    let restaurantReviews: RestaurantReview[] = []

    reviews.forEach(async personsReview => {
        const { persons, review, published_at } = personsReview

        let personResponse = await axios.get(`${process.env.BASE_URL}/persons/${persons}`)
        let person = personResponse.data
        let imgURL: string = personResponse.data.profile_image.name

        restaurantReviews.push({
            id: persons,
            review: review,
            published: published_at,
            person: person,
            imgURL: imgURL
        })
    })

    const categoriesResponse = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories = categoriesResponse.data

    return {
        props: {
            restaurant,
            categories,
            reviews,
            restaurantReviews,
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

export const getStaticPaths: GetStaticPaths = async (): Promise<StaticPathsResponse> => {
    const res = await axios.get(`${process.env.BASE_URL}/restaurants/`)
    const restaurants = res.data
    const ids: string[] = restaurants.map(restaurant => restaurant._id)
    const paths: StaticPaths[] = ids.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false,
    }
}

export default Restaurant