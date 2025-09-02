export function useGLightbox () {
  let lightbox: any

  const { $glightbox } = useNuxtApp() as any

  const initGLightbox = (selector: string) => {
    lightbox = $glightbox({ selector: selector })
  }

  const closeGLightbox = () => {
    if (lightbox) {
      lightbox.close()
      lightbox = null
    }
  }

  return { initGLightbox, closeGLightbox }
}