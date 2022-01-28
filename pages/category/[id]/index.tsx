import axios, { AxiosResponse } from 'axios'
import { useState, useEffect, useContext } from 'react'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useRouter, NextRouter } from 'next/router'
import ImageContext from '../../../context/imgs/imageContext'
import { Category } from '../../../interfaces/category/category.interface'
import { StaticPaths } from '../../../interfaces/other/static.paths.interface'
import { Image } from '../../../interfaces/imgs/image.interface'
import { Restaurant } from '../../../interfaces/restaurant/restaurant.interface'
import CardComponent from '../../../components/CardComponent'
import Layout from '../../../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Button } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import styles from '../../../styles/CategoryPage.module.css'

const Category: NextPage = ({ category, HeadProps, allCategories }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const router: NextRouter = useRouter()

    const imageContext: Image = useContext(ImageContext)
    const { categoryPage } = imageContext.images

    const [currentItems, setCurrentItems] = useState<Restaurant[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)

    const itemsPerPage: number = 8

    useEffect(() => {
        const endOffset: number = itemOffset + itemsPerPage
        setCurrentItems(category.restaurants.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(category.restaurants.length / itemsPerPage))
        // eslint-disable-next-line
    }, [category.restaurants, itemOffset, itemsPerPage])

    const handlePageClick = (event): void => {
        const newOffset = (event.selected * itemsPerPage) % category.restaurants.length
        setItemOffset(newOffset)
    }

    return (
        <Layout categories={allCategories} title={HeadProps.title} description={HeadProps.metas[0].content} imgURL={categoryPage}>
            <div className={styles.div}>
                <h1 className='text-center mt-3'><em>#{category.name}</em></h1>
                <Row>
                    {currentItems.map(restaurant => (<Col xs="12" sm="6" md="4" lg="3" key={restaurant._id}><CardComponent id={restaurant._id} name={restaurant.name} description={restaurant.description} image={restaurant.images[0].name} altText={restaurant.images[0].alternativeText} /></Col>))}
                </Row>
                <span className={`${styles.pagination} d-block`}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </span>
                <Button className='mt-3 me-2 ms-2' variant='danger' onClick={() => router.back()}>Back</Button>
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
    const categoriesResponse: AxiosResponse<Category> = await axios.get(`${process.env.BASE_URL}/categories/${ctx.params.id}`)
    const category: Category = categoriesResponse.data

    const allCategoriesResponse: AxiosResponse<Category[]> = await axios.get(`${process.env.BASE_URL}/categories`)
    const allCategories: Category[] = allCategoriesResponse.data
    return {
        props: {
            category,
            allCategories,
            HeadProps: {
                title: `${category.name} 🍴👨‍🍳 | Next.js ▶️ & Strapi.io App 🚀`,
                metas: [
                    {
                        name: 'description',
                        content: `${category.name} Restaurants blog 🍴🍝🍰☕ made with Next.js ▶️ TypeScript 📜 and ReactBootstrap ⚛️🥾 | Fetching data from the Strapi.io API 🚀`,
                    },

                ],
            },
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res: AxiosResponse<Category[]> = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories: Category[] = res.data
    const ids: string[] = categories.map(category => category._id)
    const paths: StaticPaths[] = ids.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false
    }
}

export default Category
