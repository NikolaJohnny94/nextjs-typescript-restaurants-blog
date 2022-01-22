import axios from 'axios'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useContext, useEffect } from 'react'
import CategoryContext from '../../../context/category/categoryContext'
import ImageContext from '../../../context/imgs/imageContext'
import { StaticPaths } from '../../../interfaces/staticpaths.interface'
import { StaticPathsResponse } from '../../../interfaces/staticpathsresponse.interface'
import Layout from '../../../components/Layout'
import CarouselComponent from '../../../components/CarouselComponent'
import ReviewCard from '../../../components/ReviewCard'
import CategoryButtonLinks from '../../../components/CategoryButtonLinks'
import styles from '../../../styles/Restaurant.module.css'



const Restaurant: NextPage = ({ restaurant, HeadProps }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const categoryContext = useContext(CategoryContext)
    const imageContext = useContext(ImageContext)

    const { categories, getCategories } = categoryContext
    const { restaurantPage } = imageContext.images

    useEffect(() => {
        if (categories.length === 0) {
            getCategories()
        }
    }, [])

    return (
        <Layout categories={categories} title={HeadProps.title} description={HeadProps.metas[0].content} imgURL={restaurantPage}>
            <div className={styles.div}>
                <h1 className='text-center m-3'>{restaurant.name}</h1>
                <CarouselComponent images={restaurant.images} />
                <CategoryButtonLinks categories={restaurant.categories} />
                <div className="ms-1 mt-3 mb-3 me-1"><strong>Description: </strong>{restaurant.description}</div>
                <h2 className="ms-1 mt-3 mb-3">Reviews:</h2>
                <ReviewCard reviews={restaurant.reviews} />
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
    const restaurantResponse = await axios.get(`${process.env.BASE_URL}/restaurants/${ctx.params.id}`)
    const restaurant = restaurantResponse.data
    return {
        props: {
            restaurant,
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