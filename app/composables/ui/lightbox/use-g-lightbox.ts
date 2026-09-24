import type GLightbox from 'glightbox'

export const useGLightbox = function (selector: string | undefined) {
  const { $gLightbox } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gLightbox = $gLightbox as any

  let lightbox: ReturnType<typeof GLightbox> | null

  const initGLightbox = (): void => {
    lightbox = gLightbox({ selector })
  }

  const closeGLightbox = (): void => {
    if (lightbox) lightbox.close()
  }

  return { initGLightbox, closeGLightbox }
}
