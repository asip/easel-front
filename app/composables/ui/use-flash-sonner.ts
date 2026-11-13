import { useSonner } from './use-sonner'

import type { Flash } from '~/types'

export const useFlashSonner = function (options?: { delay: number }) {
  const delay = options?.delay ?? 1000

  const { sonner } = useSonner()

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
