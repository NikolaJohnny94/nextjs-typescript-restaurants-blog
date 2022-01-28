import { useState } from "react"
import { Carousel } from "react-bootstrap"
import { ImageProps } from "../interfaces/imgs/image.prop.interface"
import styles from '../styles/CarouselComponent.module.css'

const CarouselComponent = ({ images }: ImageProps) => {

  const [index, setIndex] = useState<number>(0)

  const handleSelect = (selectedIndex: number, e: any): void => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} fade>
      {images.map(image =>
        <Carousel.Item key={image._id}>
          <img
            className={`${styles.img} d-block w-100`}
            src={image.name}
            alt={image.alternativeText}
          />
          <Carousel.Caption>
            <h3>{image.caption}</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>)}
    </Carousel>
  )
}



export default CarouselComponent
