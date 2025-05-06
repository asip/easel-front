import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'
import { usePhotoSwipe } from './use-photo-swipe'
// import 'photoswipe/style.css';

export function useLightbox (galleryRefKey: string, imageSelector?: string) {
  const galleryRef: Ref = useTemplateRef(galleryRefKey)

  let lightbox: any
  let photoswipe: boolean

  const { assignSize } = usePhotoSwipe()

  const initPSLightbox = async () => {
    const galleryEl: HTMLDivElement = galleryRef.value

    await assignSize(galleryEl)

    lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryEl.id}`,
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })

    const fullscreenPlugin = new PhotoSwipeFullscreen(lightbox)
    lightbox.init()
    photoswipe = true
  }

  const initBBLightbox = () => {
    const { $glightbox} = useNuxtApp() as any

    lightbox = $glightbox({ selector: imageSelector })
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

  return { initPSLightbox, initBBLightbox, closeLightbox }
}
