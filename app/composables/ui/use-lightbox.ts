import { useGLightbox, usePhotoSwipe } from './lightbox'

type LbOptions = { selector: string }
type LightboxOptions = { ps?: LbOptions; gl?: LbOptions }

export const useLightbox = function ({ ps, gl }: LightboxOptions) {
  const { init: initPhotoSwipe, close: closePhotoSwipe } = usePhotoSwipe(ps?.selector)
  const { init: initGLightbox, close: closeGLightbox } = useGLightbox(gl?.selector)

  const init = async (): Promise<void> => {
    if (ps?.selector) await initPhotoSwipe()
    if (gl?.selector) initGLightbox()
  }

  const close = (): void => {
    if (ps?.selector) closePhotoSwipe()
    if (gl?.selector) closeGLightbox()
  }

  return { init, close }
}
