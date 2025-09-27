type usePSOptions = { key?: string }

export function usePhotoSwipe ({ key }: usePSOptions) {
  let galleryRef: Ref
  let lightbox: any

  const { $psLightbox, $psFullscreen } = useNuxtApp() as any

  if (key) {
    galleryRef = useTemplateRef(key)
  }

  const initPhotoSwipe = async () => {
    const galleryEl: HTMLDivElement = galleryRef.value

    await assignSize(galleryEl)

    lightbox = new $psLightbox({
      gallery: `#${galleryEl.id}`,
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })

    const fullscreenPlugin = new $psFullscreen(lightbox)
    lightbox.init()
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
    const img: HTMLImageElement = new globalThis.Image()
    img.src = src
    await img.decode()
    return img
  }

  const closePhotoSwipe = () => {
    if (lightbox) {
      lightbox.destroy()
    }
  }

  return { initPhotoSwipe, closePhotoSwipe }
}