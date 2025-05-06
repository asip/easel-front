export function usePhotoSwipe () {
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

  return { assignSize }
}