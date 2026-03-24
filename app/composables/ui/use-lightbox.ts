import { useGLightbox, usePhotoSwipe } from './lightbox'

type lightboxOptions = { ps?: { selector: string }; gl?: { selector: string } }

export const useLightbox = function ({ ps, gl }: lightboxOptions) {
  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe({ selector: ps?.selector })
  const { initGLightbox, closeGLightbox } = useGLightbox({ selector: gl?.selector })

  const initLightbox = async (): Promise<void> => {
    if (ps?.selector) await initPhotoSwipe()
    if (gl?.selector) initGLightbox()
  }

  const closeLightbox = (): void => {
    if (ps?.selector) closePhotoSwipe()
    if (gl?.selector) closeGLightbox()
  }

  return { initLightbox, closeLightbox }
}
