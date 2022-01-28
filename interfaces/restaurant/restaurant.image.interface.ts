export interface RestaurantImage {
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
        medium: {
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
    related: string
    createdAt: string,
    updatedAt: string,
    __v: number,
    id: string
}
