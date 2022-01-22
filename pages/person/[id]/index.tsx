import axios from 'axios'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths, } from 'next'
import { useRouter, NextRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import CategoryContext from '../../../context/category/categoryContext'
import ImageContext from '../../../context/imgs/imageContext'
import Button from 'react-bootstrap/Button'
import { StaticPaths } from '../../../interfaces/staticpaths.interface'
import { StaticPathsResponse } from '../../../interfaces/staticpathsresponse.interface'
import Layout from '../../../components/Layout'
import styles from '../../../styles/PersonPage.module.css'

const Person: NextPage = ({ person, profileImage, HeadProps }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const router: NextRouter = useRouter()

    const categoryContext = useContext(CategoryContext)
    const imageContext = useContext(ImageContext)

    const { categories, getCategories } = categoryContext
    const { personPage } = imageContext.images

    useEffect(() => {
        if (categories.length === 0) {
            getCategories()
        }
    }, [])

    return (
        <Layout categories={categories} title={HeadProps.title} description={HeadProps.metas[0].content} imgURL={personPage}>
            <div className={styles.div}>
                <h1 className={`text-center mt-3 mb-4`}>{person.username}</h1>
                <img className={`d-block m-auto ${styles.img}`} src={profileImage} title={`${person.username}'s profile picture`} alt={`${person.firstname} ${person.lastname}'s profile picture`} />
                <div className='mt-3'>
                    <p className={`text-center`}><strong>Firstname:</strong> {person.firstname}</p>
                    <p className={`text-center`}><strong>Lastname:</strong> {person.lastname}</p>
                    <p className={`text-center ms-3 me-3`}><strong>About:</strong> {person.about}</p>
                </div>
                <Button className='d-block mt-4 me-2 ms-2' variant='danger' onClick={() => router.back()}>Back</Button>
            </div>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
    const responsePerson = await axios.get(`${process.env.BASE_URL}/persons/${ctx.params.id}`)
    const person = responsePerson.data
    const profileImage: string = person.profile_image.name

    return {
        props: {
            person,
            profileImage,
            HeadProps: {
                title: `${person.username} ${person.gender === 'male' ? '🧔' : person.gender === 'female' ? '👩' : '🙂'} | Next.js ▶️ & Strapi.io App 🚀`,
                metas: [
                    {
                        name: 'description',
                        content: `${person.username}'s profile ${person.gender === 'male' ? '🧔' : person.gender === 'female' ? '👩' : '🙂'} | Restaurants blog 🍴🍝🍰☕ made with Next.js ▶️ TypeScript 📜 and ReactBootstrap ⚛️🥾 | Fetching data from the Strapi.io API 🚀`,
                    },

                ],
            },
        }
    }
}

export const getStaticPaths: GetStaticPaths = async (): Promise<StaticPathsResponse> => {
    const res = await axios.get(`${process.env.BASE_URL}/persons`)
    const persons = res.data
    const ids: string[] = persons.map(person => person._id)
    const paths: StaticPaths[] = ids.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false
    }
}

export default Person
