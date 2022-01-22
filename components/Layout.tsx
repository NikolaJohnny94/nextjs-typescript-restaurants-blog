import NavComponent from './NavComponent'
import Footer from './Footer'
import Head from 'next/head'

const Layout = ({ children, categories, title, description, imgURL }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta property='og:image' content={imgURL} />
            </Head>
            <NavComponent categories={categories} />
            {children}
            <Footer />
        </>
    )
}

export default Layout