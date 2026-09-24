import type PhotoSwipeLightbox from 'photoswipe/lightbox'

type PsOptions = {
  anchor?: string
  zoomLevel?: 'fit' | 'fill' | number
}

export const usePhotoSwipe = function (selector: string | undefined, options?: PsOptions) {
  const { $psLightbox /* , $psFullscreen */ } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const psLightbox = $psLightbox as any
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const psFullscreen = $psFullscreen as any

  const anchor = options?.anchor ?? 'a'
  const zoomLevel = options?.zoomLevel ?? 'fit'

  let lightbox: PhotoSwipeLightbox

  const initPhotoSwipe = async (): Promise<void> => {
    if (selector) {
      await assignSize()

      lightbox = new psLightbox({
        gallery: selector,
        children: anchor,
        initialZoomLevel: zoomLevel,
        pswpModule: () => import('photoswipe'),
      })

      // const fullscreenPlugin = new psFullscreen(lightbox) // eslint-disable-line
      lightbox.init()
    }
  }

  const assignSize = async (): Promise<void> => {
    const anchors = document.querySelectorAll(`${selector} ${anchor}`)
    // console.log(anchors)
    if (anchors) {
      for await (const el of anchors) {
        const img: HTMLImageElement = await loadImage((el as HTMLLinkElement).href)
        // console.log(img.naturalWidth.toString())
        // console.log(img.naturalHeight.toString())
        el.setAttribute('data-pswp-width', img.naturalWidth.toString())
        el.setAttribute('data-pswp-height', img.naturalHeight.toString())
        el.firstElementChild?.removeAttribute('style')
      }
    }
  }

  const loadImage = async (src: string): Promise<HTMLImageElement> => {
    const img: HTMLImageElement = new globalThis.Image()
    img.src = src
    await img.decode()
    return img
  }

  const closePhotoSwipe = (): void => {
    if (lightbox) lightbox.destroy()
  }

  return { initPhotoSwipe, closePhotoSwipe }
}
