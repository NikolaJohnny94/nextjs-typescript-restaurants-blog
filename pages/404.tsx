import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useContext, useEffect } from 'react'
import CategoryContext from '../context/category/categoryContext'
import ImageContext from '../context/imgs/imageContext'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import styles from '../styles/ErrorPage.module.css'

const NotFoundErrorPage: NextPage = ({ HeadProps }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const categoryContext = useContext(CategoryContext)
    const imageContext = useContext(ImageContext)

    const { categories, getCategories } = categoryContext
    const { errorPage } = imageContext.images

    useEffect(() => {
        if (categories.length === 0) {
            getCategories()
        }
    }, [])

    return (
        <Layout categories={categories} title={HeadProps.title} description={HeadProps.metas[0].content} imgURL={errorPage}>
            <div className={styles.errorContainer}></div>
            <Row className={styles.errorRow}>
                <h1 className={`${styles.errorH1} mt-2 text-danger text-center `}>404 | Page not found</h1>
                <span className={`${styles.errorSpan} ms-2 text-danger text-center`}>
                    <FontAwesomeIcon icon={faExclamationTriangle} size='sm' />
                </span>
            </Row>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            HeadProps: {
                title: '404 | Not Found ⚠️ | Next.js, Restaurants Blog 🍴🍝☕',
                metas: [
                    {
                        name: 'description',
                        content: '404 | Not Found ⚠️ Restaurants blog 🍴🍝🍰☕ made with Next.js ▶️ TypeScript 📜 and ReactBootstrap ⚛️🥾 | Fetching data from the Strapi.io API 🚀',
                    },

                ],
            },
        }
    }
}


export default NotFoundErrorPage
