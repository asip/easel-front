import { usePhotoSwipe } from './lightbox'

type GalleryOptions = { selector: string; anchor?: string }

export const useImageGallery = function ({ selector, anchor }: GalleryOptions) {
  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe({ selector, anchor })

  const initGallery = (): void => {
    initPhotoSwipe()
  }

  const closeGallery = (): void => {
    closePhotoSwipe()
  }

  return { initGallery, closeGallery }
}
