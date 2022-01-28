import { createContext } from 'react'
import { Image } from '../../interfaces/imgs/image.interface'

const ImageContext = createContext<Image>({} as Image)

export default ImageContext
