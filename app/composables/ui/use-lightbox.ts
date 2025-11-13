import { usePhotoSwipe } from './use-photo-swipe'
import { useGLightbox } from './use-g-lightbox'

type initPSOptions = { selector: string }

export function useLightbox () {
  let photoswipe: boolean

  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe()
  const { initGLightbox, closeGLightbox } = useGLightbox()

  const initPSLightbox = async ({ selector }: initPSOptions): Promise<void> => {
    await initPhotoSwipe({ selector })
    photoswipe = true
  }

  const closeLightbox = (): void => {
    if (photoswipe) {
      closePhotoSwipe()
    } else {
      closeGLightbox()
    }
  }

  return { initPSLightbox, initGLightbox, closeLightbox }
}
