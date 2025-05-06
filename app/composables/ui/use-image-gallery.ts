export function useImageGallery () {
  let gallery: any = null

  const { $glightbox } = useNuxtApp() as any

  const initGallery = (selector: string) => {
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
