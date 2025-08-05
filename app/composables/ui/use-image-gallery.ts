import { useGLightbox } from './use-g-lightbox'

export function useImageGallery () {

  const { initGLightbox, closeGLightbox } = useGLightbox()

  const initGallery = (selector: string) => {
    initGLightbox(selector)
  }

  const closeGallery = () => {
    closeGLightbox()
  }

  return { initGallery, closeGallery }
}
