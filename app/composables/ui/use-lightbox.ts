import { usePhotoSwipe } from './use-photo-swipe'
import { useGLightbox } from './use-g-lightbox'

type useLightboxOptions = { psKey?: string }

export function useLightbox ({ psKey } : useLightboxOptions) {
  let photoswipe: boolean

  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe({ key: psKey })
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
