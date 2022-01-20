import axios from 'axios'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import styles from '../styles/ErrorPage.module.css'

const InternalServerErrorPage: NextPage = ({ categories, HeadProps }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const imgURL: string = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    return (
        <Layout categories={categories}>
            <Head>
                <title>{HeadProps.title}</title>
                <meta name='description' content={HeadProps.metas[0].content} />
                <meta property='og:image' content={imgURL} />
            </Head>
            <div className={styles.errorContainer}></div>
            <Row className={styles.errorRow}>
                <h1 className={`${styles.errorH1} mt-2 text-danger text-center `}>500 | Internal Server Errord</h1>
                <span className={`${styles.errorSpan} ms-2 text-danger text-center`}>
                    <FontAwesomeIcon icon={faRobot} size='sm' />
                </span>
            </Row>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories = res.data
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
