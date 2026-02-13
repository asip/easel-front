type glOptions = {
  selector: string | undefined
}

export function useGLightbox({ selector }: glOptions) {
  let lightbox: any

  const { $gLightbox } = useNuxtApp() as any

  const initGLightbox = (): void => {
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
