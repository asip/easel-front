import { useGLightbox } from './use-g-lightbox'

type initGalleryOptions = { selector: string }

export function useImageGallery () {

  const { initGLightbox, closeGLightbox } = useGLightbox()

  const initGallery = ({ selector }: initGalleryOptions): void => {
    initGLightbox({ selector })
  }

  const closeGallery = (): void => {
    closeGLightbox()
  }

  return { initGallery, closeGallery }
}
