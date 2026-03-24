import { usePhotoSwipe } from './lightbox'

type galleryOptions = { selector: string; anchor?: string }

export const useImageGallery = function ({ selector, anchor }: galleryOptions) {
  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe({ selector, anchor })

  const initGallery = (): void => {
    initPhotoSwipe()
  }

  const closeGallery = (): void => {
    closePhotoSwipe()
  }

  return { initGallery, closeGallery }
}
