import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'
// import 'photoswipe/style.css';

export function useLightbox (galleryRefKey: string, imageSelector?: string) {
  const galleryRef: Ref = useTemplateRef(galleryRefKey)

  let lightbox: any
  let photoswipe: boolean

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
    const { $glightbox} = useNuxtApp()

    lightbox = $glightbox({ selector: imageSelector })
  }

  const assignSize = async (gallery: HTMLDivElement) => {
    const galleryAnchors = gallery?.querySelectorAll('a')
    for await (const el of galleryAnchors) {
      const img: HTMLImageElement = await loadImage(el.href)
      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    }
  }

  const loadImage = async (src: string) => {
    const img: HTMLImageElement = new window.Image()
    img.src = src
    await img.decode()
    return img
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
