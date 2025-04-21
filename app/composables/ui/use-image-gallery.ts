// @ts-expect-error
import baguetteBox from 'baguettebox.js'

export function useImageGallery (selector: string) {
  let gallery: any = null

  const initGallery = () => {
    if (gallery && document.querySelector('#baguetteBox-overlay')) { baguetteBox.destroy() }

    gallery = baguetteBox.run(selector)
  }

  const closeGallery = () => {
    if (gallery && document.querySelector('#baguetteBox-overlay')) {
      baguetteBox.destroy()
      gallery = null
    }
  }

  return { initGallery, closeGallery }
}
