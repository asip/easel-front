import type GLightbox from 'glightbox'

type glOptions = {
  selector: string | undefined
}

export const useGLightbox = function ({ selector }: glOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gLightbox } = useNuxtApp() as any

  let lightbox: ReturnType<typeof GLightbox> | null

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
