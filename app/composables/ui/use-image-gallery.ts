import { usePhotoSwipe } from './lightbox'

type GalleryOptions = { anchor?: string; zoomLevel?: 'fit' | 'fill' | number }

export const useImageGallery = function (selector: string, options?: GalleryOptions) {
  const anchor = options?.anchor
  const zoomLevel = options?.zoomLevel ?? 'fit'

  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe(selector, { anchor, zoomLevel })

  const initGallery = (): void => {
    initPhotoSwipe()
  }

  const closeGallery = (): void => {
    closePhotoSwipe()
  }

  return { initGallery, closeGallery }
}
