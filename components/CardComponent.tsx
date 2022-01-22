import Link from 'next/link'
import { Card } from 'react-bootstrap'
import { CardProps } from '../interfaces/cardprops.interface'
import styles from '../styles/CardComponent.module.css'

const CardComponent = ({ id, name, description, image, altText }: CardProps) => {

    return (
        <>
            <Link href={`/restaurant/${id}`} passHref>
                <Card className={`${styles.cardComponent} mt-4 ms-3 me-3`} title={name}>
                    <Card.Img className={styles.image} variant="top" src={image} alt={altText} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            {description.substring(0, 164)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}

export default CardComponent