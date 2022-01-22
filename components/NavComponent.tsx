import { useContext } from 'react'
import Link from 'next/link'
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap'
import ImageContext from '../context/imgs/imageContext'
import styles from '../styles/NavComponent.module.css'

const NavComponent = ({ categories }) => {

    const imageContext = useContext(ImageContext)
    const { url, title, alt } = imageContext.images.navComponent

    return (
        <>
            <Navbar bg="primary" expand="lg" className='justify-content-evenly'>
                <Container className={styles.divContainer}>
                    <Navbar.Brand><Link href='/' passHref><img className={styles.img} src={url} alt={alt} title={title} /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav">
                        <Nav>
                            <NavDropdown title="Categories" id="basic-nav-dropdown" className={`${styles.dropdownCategories} text-light`}>
                                {categories.map(category => (<Link href={`/category/${category._id}`} passHref key={category._id}><li className='text-center dropdown-item'>{category.name}</li></Link>))}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavComponent