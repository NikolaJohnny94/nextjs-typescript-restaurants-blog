import Link from 'next/link'
import { PersonCardProps } from '../interfaces/card/person.card.props.interface'
import styles from '../styles/PersonCard.module.css'

const PersonCard = ({ review, published, person, imgURL }: PersonCardProps) => {

    return (
        <div>
            {
                imgURL &&
                <Link href={`/person/${person._id}`} passHref>
                    <img
                        className={`${styles.img} m-2`}
                        src={imgURL}
                        alt={`${person.firstname} ${person.lastname}'s profile picture`}
                        title={`Visit ${person.firstname} ${person.lastname}'s profile`}
                    />
                </Link>
            }
            {person.username}
            <div className="m-3">
                <em>{review}</em><br />
                {published.split("T")[0]} ({published.split("T")[1].split(".")[0]})
            </div>
        </div>
    )
}

export default PersonCard
