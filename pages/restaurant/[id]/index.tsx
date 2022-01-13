import axios from 'axios'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import Head from 'next/head'
import { StaticPaths } from '../../../interfaces/staticpaths.interface'
import { StaticPathsResponse } from '../../../interfaces/staticpathsresponse.interface'
import Layout from '../../../components/Layout'
import CarouselComponent from '../../../components/CarouselComponent'
import ReviewCard from '../../../components/ReviewCard'
import CategoryButtonLinks from '../../../components/CategoryButtonLinks'
import styles from '../../../styles/Restaurant.module.css'



const Restaurant: NextPage = ({ restaurant, HeadProps, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const imgURL: string = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'

    return (
        <Layout categories={categories}>
            <Head>
                <title>{HeadProps.title}</title>
                <meta name='description' content={HeadProps.metas[0].content} />
                <meta property='og:image' content={imgURL} />
            </Head>
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
    const categoriesResponse = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories = categoriesResponse.data
    return {
        props: {
            restaurant,
            categories,
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