import { createContext } from 'react'
import { Images } from '../../interfaces/images.interface'


const ImageContext = createContext<Images>({} as Images)

export default ImageContext
