import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'

export function usePhotoSwipe (galleryRefKey?: string) {
  let galleryRef: Ref

  if (galleryRefKey) {
    galleryRef = useTemplateRef(galleryRefKey)
  }

  const initPhotoSwipe = async () => {
    const galleryEl: HTMLDivElement = galleryRef.value

    await assignSize(galleryEl)

    const lightbox: any = new PhotoSwipeLightbox({
      gallery: `#${galleryEl.id}`,
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })

    const fullscreenPlugin = new PhotoSwipeFullscreen(lightbox)
    lightbox.init()

    return lightbox
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

  return { initPhotoSwipe }
}