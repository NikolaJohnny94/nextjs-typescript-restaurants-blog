import NavComponent from './NavComponent'
import Footer from './Footer'

const Layout = ({ children, categories }) => {

    return (
        <>
            <NavComponent categories={categories} />
            {children}
            <Footer />
        </>
    )
}

export default Layout