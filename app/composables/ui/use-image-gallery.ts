import { usePhotoSwipe } from './lightbox'

type GalleryOptions = { anchor?: string; zoomLevel?: 'fit' | 'fill' | number }

export const useImageGallery = function (selector: string, options?: GalleryOptions) {
  const anchor = options?.anchor
  const zoomLevel = options?.zoomLevel ?? 'fit'

  const { init: initPhotoSwipe, close: closePhotoSwipe } = usePhotoSwipe(selector, {
    anchor,
    zoomLevel,
  })

  const init = (): void => {
    initPhotoSwipe()
  }

  const close = (): void => {
    closePhotoSwipe()
  }

  return { init, close }
}
