type psOptions = { selector: string | undefined; anchor?: string }

export function usePhotoSwipe({ selector, anchor = 'a' }: psOptions) {
  let lightbox: any

  const { $psLightbox, $psFullscreen } = useNuxtApp() as any

  const initPhotoSwipe = async (): Promise<void> => {
    if (selector) {
      await assignSize()

      lightbox = new $psLightbox({
        gallery: selector,
        children: anchor,
        initialZoomLevel: 'fit',
        pswpModule: () => import('photoswipe'),
      })

      const fullscreenPlugin = new $psFullscreen(lightbox) // eslint-disable-line
      lightbox.init()
    }
  }

  const assignSize = async (): Promise<void> => {
    const galleryAnchors = document.querySelectorAll(`${selector} ${anchor}`)
    // console.log(galleryAnchors)
    if (galleryAnchors) {
      for await (const el of galleryAnchors) {
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
