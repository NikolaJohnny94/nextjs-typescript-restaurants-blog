import axios, { AxiosResponse } from 'axios'
import { useContext } from 'react'
import { NextPage, GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { useRouter, NextRouter } from 'next/router'
import ImageContext from '../../../context/imgs/imageContext'
import { Person } from '../../../interfaces/person/person.interface'
import { Category } from '../../../interfaces/category/category.interface'
import { StaticPaths } from '../../../interfaces/other/static.paths.interface'
import { Image } from '../../../interfaces/imgs/image.interface'
import Layout from '../../../components/Layout'
import Button from 'react-bootstrap/Button'
import styles from '../../../styles/PersonPage.module.css'

const Person: NextPage = ({ person, profileImage, HeadProps, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const router: NextRouter = useRouter()

    const imageContext: Image = useContext(ImageContext)
    const { personPage } = imageContext.images

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

export const getStaticProps: GetStaticProps = async (context: any) => {
    const responsePerson: AxiosResponse<Person> = await axios.get(`${process.env.BASE_URL}/persons/${context.params.id}`)
    const person: Person = responsePerson.data
    const profileImage: string = person.profile_image.name

    const categoriesResponse: AxiosResponse<Category[]> = await axios.get(`${process.env.BASE_URL}/categories`)
    const categories: Category[] = categoriesResponse.data

    return {
        props: {
            person,
            profileImage,
            categories,
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

export const getStaticPaths: GetStaticPaths = async () => {
    const res: AxiosResponse<Person[]> = await axios.get(`${process.env.BASE_URL}/persons`)
    const persons: Person[] = res.data
    const ids: string[] = persons.map(person => person._id)
    const paths: StaticPaths[] = ids.map(id => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: false
    }
}

export default Person
