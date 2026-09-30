import { usePhotoSwipe, type PsOptions } from './lightbox'

export const useImageGallery = function (selector: string, options?: PsOptions) {
  const anchor = options?.anchor
  const initialZoomLevel = options?.initialZoomLevel ?? 'fit'

  const { init: initPhotoSwipe, close: closePhotoSwipe } = usePhotoSwipe(selector, {
    anchor,
    initialZoomLevel,
  })

  const init = (): void => {
    initPhotoSwipe()
  }

  const close = (): void => {
    closePhotoSwipe()
  }

  return { init, close }
}
