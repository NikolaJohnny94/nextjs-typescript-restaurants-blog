import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'
import { PersonCardProps } from '../interfaces/personcardprops.interface'
import styles from '../styles/PersonCard.module.css'

const PersonCard = ({ id, review, published }: PersonCardProps) => {

    const [person, setPerson] = useState<any>([])
    const [imgURL, setImgURL] = useState<string>('')

    const getUser = async (): Promise<void> => {
        const res = await axios.get(`${process.env.BASE_URL}/persons/${id}`)
        setPerson(res.data)
        setImgURL(res.data.profile_image.name)
    }

    getUser()

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
