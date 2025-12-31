import { usePhotoSwipe } from './lightbox'

type initGalleryOptions = { selector: string, anchor?: string }

export function useImageGallery () {

  const { initPhotoSwipe, closePhotoSwipe } = usePhotoSwipe()

  const initGallery = ({ selector, anchor }: initGalleryOptions): void => {
    initPhotoSwipe({ selector, anchor })
  }

  const closeGallery = (): void => {
    closePhotoSwipe()
  }

  return { initGallery, closeGallery }
}
