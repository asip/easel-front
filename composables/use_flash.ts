import type { Flash } from '~/interfaces/flash'

export function useFlash () {
  const flash = ref<Flash>({})

  const clearFlash = () => {
    flash.value = {}
  }

  /*
  const setFlash = (toast: any) => {
    console.log(flash.value.alert)
    console.log(flash.value.info)
    for (const [messageType, message] of Object.entries(flash.value)) {
      if (message !== '') {
        console.log('test')
        switch (messageType.toString()) {
          case 'info':
            console.log('info')
            setTimeout(
              () => {
                toast.info(message)
              }, 1000)
            break
          case 'alert':
            console.log('alert')
            setTimeout(
              () => {
                toast.error(message)
              }, 1000)
            break
        }
      }
    }
  }
  */

  return { flash, clearFlash }
}
