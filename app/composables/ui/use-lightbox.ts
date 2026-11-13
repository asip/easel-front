import { useGLightbox, usePhotoSwipe } from './lightbox'

type LbOptions = { selector: string }
type LightboxOptions = { ps?: LbOptions; gl?: LbOptions }

export const useLightbox = function ({ ps, gl }: LightboxOptions) {
  const { init: initPS, close: closePS } = usePhotoSwipe(ps?.selector)
  const { init: initGL, close: closeGL } = useGLightbox(gl?.selector)

  const init = async (): Promise<void> => {
    if (ps?.selector) await initPS()
    if (gl?.selector) initGL()
  }

  const close = (): void => {
    if (ps?.selector) closePS()
    if (gl?.selector) closeGL()
  }

  return { init, close }
}
