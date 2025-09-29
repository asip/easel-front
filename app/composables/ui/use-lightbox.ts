import { usePhotoSwipe } from './use-photo-swipe'
import { useGLightbox } from './use-g-lightbox'

type initPSOptions = { selector: string }

export function useLightbox () {
  let photoswipe: boolean

  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe()
  const { initGLightbox, closeGLightbox } = useGLightbox()

  const initPSLightbox = async ({ selector }: initPSOptions) => {
    await initPhotoSwipe({ selector })
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
