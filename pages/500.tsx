import axios from 'axios'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useContext } from 'react'
import ImageContext from '../context/imgs/imageContext'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import styles from '../styles/ErrorPage.module.css'

const InternalServerErrorPage: NextPage = ({ HeadProps, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const imageContext = useContext(ImageContext)

    const { errorPage } = imageContext.images

    return (
        <Layout categories={categories} title={HeadProps.title} description={HeadProps.metas[0].content} imgURL={errorPage}>
            <div className={styles.errorContainer}></div>
            <Row className={styles.errorRow}>
                <h1 className={`${styles.errorH1} mt-2 text-danger text-center `}>500 | Internal Server Error</h1>
                <span className={`${styles.errorSpan} ms-2 text-danger text-center`}>
                    <FontAwesomeIcon icon={faRobot} size='sm' />
                </span>
            </Row>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const categoriesResponse = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories = categoriesResponse.data
    return {
        props: {
            categories,
            HeadProps: {
                title: '500 | Internal Server Error ⚠️ | Next.js, Restaurants Blog 🍴🍝☕',
                metas: [
                    {
                        name: 'description',
                        content: '500 | Internal Server Error ⚠️ Restaurants blog 🍴🍝🍰☕ made with Next.js ▶️ TypeScript 📜 and ReactBootstrap ⚛️🥾 | Fetching data from the Strapi.io API 🚀',
                    },

                ],
            },
        }
    }
}


export default InternalServerErrorPage
