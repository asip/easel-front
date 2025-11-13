import type { Flash } from '~/interfaces'

export function useSonner () {
  const { $toast } = useNuxtApp()

  const setFlash = (flash: Flash): void => {
    // console.log(flash.alert)
    // console.log(flash.info)
    for (const [messageType, message] of Object.entries(flash)) {
      if (message !== '') {
        switch (messageType) {
          case 'info':
            // console.log('info')
            setTimeout(
              () => {
                $toast.info(message)
              }, 1000)
            break
          case 'alert':
            // console.log('alert')
            setTimeout(
              () => {
                $toast.error(message)
              }, 1000)
            break
        }
      }
    }
  }

  const setMessages = (messages: string[]): void => {
    for (const message of messages.reverse()) {
      setTimeout(
        () => {
          $toast.error(message)
        }, 500)
    }
  }

  return { setFlash, setMessages }
}
