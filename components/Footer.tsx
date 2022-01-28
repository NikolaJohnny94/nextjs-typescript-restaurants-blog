import { NextComponentType } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faCodepen, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Icon } from '../interfaces/other/icon.interface'
import styles from '../styles/Footer.module.css'

const Footer: NextComponentType = () => {

    const icons: Icon[] = [
        {
            id: 1,
            iconName: faGithub,
            url: 'https://github.com/NikolaJohnny94',
            title: 'Follow me on GitHub',
            className: 'github'
        },
        {
            id: 2,
            iconName: faLinkedinIn,
            url: 'https://www.linkedin.com/in/nikola-ivanovi%C4%87-2b6a13179/',
            title: 'Let\'s connect on LinkedIn',
            className: 'linkedin'
        },
        {
            id: 3,
            iconName: faCodepen,
            url: 'https://codepen.io/NikolaJohnny/pens/public',
            title: 'Follow me on CodePen',
            className: 'codepen'
        },
        {
            id: 4,
            iconName: faTwitter,
            url: 'https://twitter.com/nikola8794pwd',
            title: 'Follow me on Twitter',
            className: 'twitter'
        }
    ]

    return (
        <footer className={`${styles.footer} bg-primary`}>
            <div className={styles.iconContainer}>
                {
                    icons.slice(0, 2).map(icon => (<a key={icon.id} href={icon.url} title={icon.title} target="_blank" rel="noreferrer"><FontAwesomeIcon className={`${styles.icons} ${styles[icon.className]} mt-2 mb-2 me-2`} icon={icon.iconName} /></a>))
                }
                <p className='fw-bold mt-2 me-2 mb-2 ms-0 text-light'>Developed by Nikola</p>
                {
                    icons.slice(2, 4).map(icon => (<a key={icon.id} href={icon.url} title={icon.title} target="_blank" rel="noreferrer"><FontAwesomeIcon key={icon.id} className={`${styles.icons} ${styles[icon.className]} mt-2 mb-2 me-2`} icon={icon.iconName} /></a>))
                }
            </div>
        </footer>
    )
}

export default Footer