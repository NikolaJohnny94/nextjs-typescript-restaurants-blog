import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import ImageState from '../context/imgs/ImageState'

function MyApp({ Component, pageProps }: AppProps) {
  return <ImageState><Component {...pageProps} /></ImageState>
}

export default MyApp
