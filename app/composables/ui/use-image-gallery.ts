import { usePhotoSwipe, type PsOptions } from './photoswipe'

export const useImageGallery = function (selector: string, options?: PsOptions) {
  const anchor = options?.anchor
  const initialZoomLevel = options?.initialZoomLevel ?? 'fit'

  const { init: initPS, close: closePS } = usePhotoSwipe(selector, {
    anchor,
    initialZoomLevel,
  })

  const init = (): void => {
    initPS()
  }

  const close = (): void => {
    closePS()
  }

  return { init, close }
}
