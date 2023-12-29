// @ts-ignore
import { LuminousGallery } from 'luminous-lightbox'

export function useImageGallery(){
  let gallery: LuminousGallery = null

  const initGallery = () => {
    if (gallery) { gallery.destroy() }
    const elements: NodeListOf<Element> = document.querySelectorAll('.lum-lightbox')
    Array.from(elements).forEach(e => e.remove())

    const elms = document.querySelectorAll('[name="lm"]')
    gallery = new LuminousGallery(elms, { showCloseButton: true })
  }

  const closeGallery = () => {
    if (gallery) {
      gallery.destroy()
      gallery = null
    }
  }

  return { initGallery, closeGallery }
}