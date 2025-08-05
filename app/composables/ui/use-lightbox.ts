import { usePhotoSwipe } from './use-photo-swipe'
// import 'photoswipe/style.css';

export function useLightbox (galleryRefKey?: string) {
  let lightbox: any
  let photoswipe: boolean

  const { initPhotoSwipe } = usePhotoSwipe(galleryRefKey)

  const initPSLightbox = async () => {
    lightbox = await initPhotoSwipe()
    photoswipe = true
  }

  const initGLightbox = (selector: string) => {
    const { $glightbox } = useNuxtApp() as any

    lightbox = $glightbox({ selector: selector })
  }

  const closeLightbox = () => {
    if (lightbox) {
      if (photoswipe) {
        lightbox.destroy()
      } else {
        lightbox.close()
      }
      lightbox = null
    }
  }

  return { initPSLightbox, initGLightbox, closeLightbox }
}
