type glOptions = {
  selector: string | undefined
}

export function useGLightbox({ selector }: glOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lightbox: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
