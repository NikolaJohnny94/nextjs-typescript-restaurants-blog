import styles from '../styles/ReviewContainer.module.css'

const ReviewContainer = ({ children }: any) => {
    return (
        <div className={styles.div}>
            {children}
        </div>
    )
}

export default ReviewContainer

