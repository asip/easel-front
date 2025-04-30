export function useImageGallery (selector: string) {
  let gallery: any = null

  const { $glightbox } = useNuxtApp() as any

  const initGallery = () => {
    gallery = $glightbox({ selector: selector })
  }

  const closeGallery = () => {
    if (gallery) {
      gallery.close()
      gallery = null
    }
  }

  return { initGallery, closeGallery }
}
