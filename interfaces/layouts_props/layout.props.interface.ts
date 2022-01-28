import React from 'react'
import { Category } from '../category/category.interface'

export interface LayoutProps {
    children: React.ReactNode,
    categories: Category[],
    title: string,
    description: string,
    imgURL: string
}