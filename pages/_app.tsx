import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import CategoryState from '../context/category/CategoryState'
import ImageState from '../context/imgs/ImageState'

function MyApp({ Component, pageProps }: AppProps) {
  return <CategoryState><ImageState><Component {...pageProps} /></ImageState></CategoryState>
}

export default MyApp
