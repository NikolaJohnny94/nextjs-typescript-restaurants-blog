import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import ImageContext from '../context/imgs/imageContext'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import CardComponent from '../components/CardComponent'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ restaurants, HeadProps, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const imageContext = useContext(ImageContext)
  const { homePage } = imageContext.images

  const [currentItems, setCurrentItems] = useState<InferGetStaticPropsType<typeof getStaticProps>[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [itemOffset, setItemOffset] = useState<number>(0)

  const itemsPerPage: number = 8

  useEffect(() => {

    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(restaurants.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(restaurants.length / itemsPerPage))
    // eslint-disable-next-line
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event): void => {
    const newOffset = (event.selected * itemsPerPage) % restaurants.length
    setItemOffset(newOffset)
  }

  return (
    <Layout categories={categories} title={HeadProps.title} description={HeadProps.metas[0].content} imgURL={homePage}>
      <h1 className='text-center mt-4'><em>Restaurants</em></h1>
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
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const restaurantResponse = await axios.get(`${process.env.BASE_URL}/restaurants`)
  const restaurants = restaurantResponse.data
  const categoriesResponse = await axios.get(`${process.env.BASE_URL}/categories`)
  const categories = categoriesResponse.data
  return {
    props: {
      restaurants,
      categories,
      HeadProps: {
        title: 'Next.js Restaurants Blog 🍴🍝🍰☕ | Next.js ▶️ & Strapi.io 🚀',
        metas: [
          {
            name: 'description',
            content: 'Restaurants blog 🍴🍝🍰☕ made with Next.js ▶️ TypeScript 📜 and ReactBootstrap ⚛️🥾 | Fetching data from the Strapi.io API 🚀',
          },

        ],
      },
    }
  }
}

export default Home
