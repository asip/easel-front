import { usePhotoSwipe } from './lightbox'

type GalleryOptions = { selector: string; anchor?: string; zoomLevel?: 'fit' | 'fill' | number }

export const useImageGallery = function ({ selector, anchor, zoomLevel = 'fit' }: GalleryOptions) {
  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe({ selector, anchor, zoomLevel })

  const initGallery = (): void => {
    initPhotoSwipe()
  }

  const closeGallery = (): void => {
    closePhotoSwipe()
  }

  return { initGallery, closeGallery }
}
