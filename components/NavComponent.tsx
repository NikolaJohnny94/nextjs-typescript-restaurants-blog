import Link from 'next/link'
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap'
import { Image } from '../interfaces/image.interface'
import styles from '../styles/NavComponent.module.css'

const NavComponent = ({ categories }) => {

    const img: Image = {
        url: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        title: 'Home',
        alt: 'Logo'
    }

    return (
        <>
            <Navbar bg="primary" expand="lg" className='justify-content-evenly'>
                <Container className={styles.divContainer}>
                    <Navbar.Brand><Link href='/' passHref><img className={styles.img} src={img.url} alt={img.alt} title={img.title} /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav">
                        <Nav>
                            <NavDropdown title="Categories" id="basic-nav-dropdown" className={`${styles.dropdownCategories} text-light`}>
                                {categories.map(category => (<li className='text-center dropdown-item' key={category._id}><Link href={`/category/${category._id}`} passHref>{category.name}</Link></li>))}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavComponent