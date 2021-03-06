export interface Image {
    images: {
        categoryPage: string,
        personPage: string,
        restaurantPage: string,
        homePage: string,
        errorPage: string,
        navComponent: {
            url: string,
            title: string,
            alt: string
        }
    }
}