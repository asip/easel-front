import { usePhotoSwipe } from './use-photo-swipe'
import { useGLightbox } from './use-g-lightbox'

export function useLightbox (galleryRefKey?: string) {
  let photoswipe: boolean

  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe(galleryRefKey)
  const { initGLightbox, closeGLightbox } = useGLightbox()

  const initPSLightbox = async () => {
    await initPhotoSwipe()
    photoswipe = true
  }

  const closeLightbox = () => {
    if (photoswipe) {
      closePhotoSwipe()
    } else {
      closeGLightbox()
    }
  }

  return { initPSLightbox, initGLightbox, closeLightbox }
}
