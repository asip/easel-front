import type { Flash } from '~/types'

export const useSonner = function () {
  const { $toast } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = $toast as any

  const sonner = computed<undefined, Flash | string[]>({
    get() {
      return undefined
    },
    set(value: Flash | string[]) {
      if (Object.keys(value).length === 0) return

      if ('notice' in value || 'alert' in value) {
        setFlash(value)
      } else {
        setMessages(value as string[])
      }
    },
  })

  const setFlash = (flash: Flash): void => {
    // console.log(flash.alert)
    // console.log(flash.info)
    for (const [messageType, message] of Object.entries(flash)) {
      if (message !== '') {
        switch (messageType) {
          case 'notice':
            // console.log('info')
            setTimeout(() => {
              toast.info(message)
            }, 1000)
            break
          case 'alert':
            // console.log('alert')
            setTimeout(() => {
              toast.error(message)
            }, 1000)
            break
        }
      }
    }
  }

  const setMessages = (messages: string[]): void => {
    for (const message of messages.reverse()) {
      setTimeout(() => {
        toast.error(message)
      }, 500)
    }
  }

  return { sonner }
}
