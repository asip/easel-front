// @ts-ignore
import { Luminous } from 'luminous-lightbox'
// @ts-ignore
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-ignore
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'
// import 'photoswipe/style.css';

export function useLightbox () {
  const galleryRef: Ref = ref(null)

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

  const initLMLightbox = () => {
    const imageEl: HTMLAnchorElement | null = document.querySelector('#image')
    lightbox = new Luminous(imageEl, { showCloseButton: true })
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
      lightbox.destroy()
      lightbox = null
    }
  }

  return { galleryRef, initPSLightbox, initLMLightbox, closeLightbox }
}