import type { Flash } from '~/interfaces/flash'

export function useFlash () {
  const flash = ref<Flash>({})

  const clearFlash = () => {
    flash.value = {}
  }

  return { flash, clearFlash }
}
