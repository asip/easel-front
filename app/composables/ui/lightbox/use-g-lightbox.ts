type initGLOptions = {
  selector: string
}

export function useGLightbox () {
  let lightbox: any

  const { $gLightbox } = useNuxtApp() as any

  const initGLightbox = ({ selector }: initGLOptions): void => {
    lightbox = $gLightbox({ selector })
  }

  const closeGLightbox = (): void => {
    if (lightbox) {
      lightbox.close()
      lightbox = null
    }
  }

  return { initGLightbox, closeGLightbox }
}