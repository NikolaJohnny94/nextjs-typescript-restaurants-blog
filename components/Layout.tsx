import Head from 'next/head'
import NavComponent from './NavComponent'
import Footer from './Footer'
import { LayoutProps } from '../interfaces/layouts_props/layout.props.interface'

const Layout = ({ children, categories, title, description, imgURL }: LayoutProps) => {

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