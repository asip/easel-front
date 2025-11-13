type initPSOptions = { selector: string }

export function usePhotoSwipe () {
  let lightbox: any

  const { $psLightbox, $psFullscreen } = useNuxtApp() as any

  const initPhotoSwipe = async ({ selector}: initPSOptions): Promise<void> => {
    await assignSize(selector)

    lightbox = new $psLightbox({
      gallery: selector,
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })

    const fullscreenPlugin = new $psFullscreen(lightbox)
    lightbox.init()
  }

  const assignSize = async (selector: string): Promise<void> => {
    const gallery: HTMLDivElement | null = document.querySelector(selector)
    const galleryAnchors = gallery?.querySelectorAll('a')
    if (galleryAnchors) {
      for await (const el of galleryAnchors) {
        const img: HTMLImageElement = await loadImage(el.href)
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
    if (lightbox) {
      lightbox.destroy()
    }
  }

  return { initPhotoSwipe, closePhotoSwipe }
}