import axios from 'axios'
import { useState, useEffect } from 'react'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter, NextRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Button } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { StaticPaths } from '../../../interfaces/staticpaths.interface'
import { StaticPathsResponse } from '../../../interfaces/staticpathsresponse.interface'
import CardComponent from '../../../components/CardComponent'
import Layout from '../../../components/Layout'
import styles from '../../../styles/CategoryPage.module.css'

const Category: NextPage = ({ category, HeadProps, allCategories }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router: NextRouter = useRouter()
    const imgURL: string = 'https://images.unsplash.com/photo-1478144592103-25e218a04891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80'

    const [currentItems, setCurrentItems] = useState<InferGetStaticPropsType<typeof getStaticProps>[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)

    const itemsPerPage: number = 8

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(category.restaurants.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(category.restaurants.length / itemsPerPage))
        // eslint-disable-next-line
    }, [category.restaurants, itemOffset, itemsPerPage])

    const handlePageClick = (event): void => {
        const newOffset = (event.selected * itemsPerPage) % category.restaurants.length
        setItemOffset(newOffset)
    }

    return (
        <Layout categories={allCategories}>
            <Head>
                <title>{HeadProps.title}</title>
                <meta name='description' content={HeadProps.metas[0].content} />
                <meta property='og:image' content={imgURL} />
            </Head>
            <div className={styles.div}>
                <h1 className='text-center mt-3'><em>#{category.name}</em></h1>
                <Row>
                    {currentItems.map(restaurant => (<Col xs="12" sm="6" md="4" lg="3" key={restaurant._id}><CardComponent id={restaurant._id} name={restaurant.name} description={restaurant.description} image={restaurant.images[0].name} /></Col>))}
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
    const categoriesResponse = await axios.get(`${process.env.BASE_URL}/categories/${ctx.params.id}`)
    const category = categoriesResponse.data
    const allCategoriesResponse = await axios.get(`${process.env.BASE_URL}/categories`)
    const allCategories = allCategoriesResponse.data
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

export const getStaticPaths: GetStaticPaths = async (): Promise<StaticPathsResponse> => {
    const res = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories = res.data
    const ids: string[] = categories.map(category => category._id)
    const paths: StaticPaths[] = ids.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false
    }
}

export default Category