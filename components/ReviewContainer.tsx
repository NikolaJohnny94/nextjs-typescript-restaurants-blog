import React from 'react'
import { ChildrenProp } from '../interfaces/layouts_props/children.prop.interface'
import styles from '../styles/ReviewContainer.module.css'

const ReviewContainer = ({ children }: ChildrenProp) => {

    return (
        <div className={styles.div}>
            {children}
        </div>
    )
}

export default ReviewContainer

