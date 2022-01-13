import { useRouter, NextRouter } from 'next/router'
import { Button } from 'react-bootstrap'
import PersonCard from './PersonCard'
import styles from '../styles/ReviewCard.module.css'

const ReviewCard = ({ reviews }) => {

    const router: NextRouter = useRouter()
    return (
        <div className={styles.div}>
            {reviews.map(review => (<PersonCard key={review._id} id={review.persons} review={review.review} published={review.published_at} />))}
            <Button className='mt-3 me-2 ms-2' variant='danger' onClick={() => router.back()}>Back</Button>
        </div>
    )
}

export default ReviewCard
