import { Review } from "../restaurant/review.interface";

export interface Person {
    gender: string,
    _id: string,
    firstname: string,
    lastname: string,
    username: string,
    published_at: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    profile_image: {
        _id: string,
        name: string,
        alternativeText: string,
        caption: string,
        hash: string,
        ext: string,
        mime: string,
        size: number,
        width: number,
        height: number,
        url: string,
        formats: {
            thumbnail: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                width: number,
                height: number,
                size: number,
                path: null,
                url: string
            },
            large: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                width: number,
                height: number,
                size: number,
                path: null,
                url: string
            },
            medeium: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                width: number,
                height: number,
                size: number,
                path: null,
                url: string
            },
            small: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                width: number,
                height: number,
                size: number,
                path: null,
                url: string
            }
        },
        provider: string,
        related: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        id: string
    },
    about: string,
    reviews: Review[],
    id: string
}