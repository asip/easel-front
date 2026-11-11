import type { Flash } from '~/types'

export const useSonner = function (options?: { delay: number }) {
  const delay = options?.delay ?? 1000

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

  const messages = ref<Flash | string[]>()

  const sonners = customRef<Flash | string[] | undefined, Flash | string[]>(() => {
    return {
      get() {
        return messages.value
      },
      set(value: Flash | string[]) {
        messages.value = value

        if (('length' in value && value.length == 0) || Object.keys(value).length === 0) return

        if ('notice' in value || 'alert' in value) {
          setFlash(value)
        } else {
          setMessages(value as string[], delay / 2)
        }
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

  const setFlash = (flash: Flash): void => {
    // console.log(flash.alert)
    // console.log(flash.info)
    for (const [messageType, message] of Object.entries(flash)) {
      sonner.value = { value: message, type: messageType, delay }
    }
  }

  const setMessages = (messages: string[], delay: number): void => {
    for (const message of messages.reverse()) {
      sonner.value = { value: message, type: 'alert', delay }
    }
  }

  return { sonners }
}
