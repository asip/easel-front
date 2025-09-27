import { useGLightbox } from './use-g-lightbox'

type initGalleryOptions = { selector: string }

export function useImageGallery () {

  const { initGLightbox, closeGLightbox } = useGLightbox()

  const initGallery = ({ selector }: initGalleryOptions) => {
    initGLightbox({ selector })
  }

  const closeGallery = () => {
    closeGLightbox()
  }

  return { initGallery, closeGallery }
}
