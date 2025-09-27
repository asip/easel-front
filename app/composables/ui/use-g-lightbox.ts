type initGLOptions = {
  selector: string
}

export function useGLightbox () {
  let lightbox: any

  const { $gLightbox } = useNuxtApp() as any

  const initGLightbox = ({ selector }: initGLOptions) => {
    lightbox = $gLightbox({ selector: selector })
  }

  const closeGLightbox = () => {
    if (lightbox) {
      lightbox.close()
      lightbox = null
    }
  }

  return { initGLightbox, closeGLightbox }
}