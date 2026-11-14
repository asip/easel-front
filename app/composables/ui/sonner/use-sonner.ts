export const useSonner = function () {
  const { $toast } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = $toast as any

  interface SonnerOptions {
    value: string
    type: string
    delay: number
  }

  const sonnerOptions = ref<SonnerOptions>()

  const sonner = customRef<SonnerOptions | undefined, SonnerOptions>(() => {
    return {
      get() {
        return sonnerOptions.value
      },
      set(value: SonnerOptions) {
        sonnerOptions.value = value
        setMessage(value)
      },
    }
  })

  const setMessage = ({ value, type, delay }: SonnerOptions): void => {
    if (value) {
      switch (type) {
        case 'notice':
          // console.log('info')
          setTimeout(() => {
            toast.info(value)
          }, delay)
          break
        case 'alert':
          // console.log('alert')
          setTimeout(() => {
            toast.error(value)
          }, delay)
          break
      }
    }
  }

  return { sonner }
}
