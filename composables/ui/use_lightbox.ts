// @ts-ignore
import { Luminous } from 'luminous-lightbox'
// @ts-ignore
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-ignore
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'
// import 'photoswipe/style.css';

export function useLightbox () {
  const galleryRef: Ref = ref(null)
  const lightboxRef: Ref = ref(null)

  let lightbox: any

  const initPSLightbox = async () => {
    const galleryEl: HTMLDivElement = galleryRef.value

    await assignSize(galleryEl)

    lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryEl.id}`,
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })
    // eslint-disable-next-line
    const fullscreenPlugin = new PhotoSwipeFullscreen(lightbox)
    lightbox.init()
  }

  const initLLightbox = () => {
    const elm = lightboxRef.value
    lightbox = new Luminous(elm, { showCloseButton: true })
  }

  const assignSize = async (gallery: HTMLDivElement) => {
    const el = gallery.querySelector('a')
    if (el) {
      const img: HTMLImageElement = await loadImage(el.href)
      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    }
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = e => reject(e)
      img.src = src
    })
  }

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.destroy()
      lightbox = null
    }
  }

  return { galleryRef, lightboxRef, initPSLightbox, initLLightbox, closeLightbox }
}
