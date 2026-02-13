import { useGLightbox, usePhotoSwipe } from './lightbox'

type lightboxOptions = { ps?: { selector: string }; gl?: { selector: string } }

export function useLightbox({ ps, gl }: lightboxOptions) {
  let photoswipe: boolean

  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe({ selector: ps?.selector })
  const { initGLightbox, closeGLightbox } = useGLightbox({ selector: gl?.selector })

  const initPSLightbox = async (): Promise<void> => {
    await initPhotoSwipe()
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
