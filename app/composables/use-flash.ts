import type { Flash } from '~/interfaces'

export function useFlash () {
  const flash = ref<Flash>({})

  const clearFlash = () => {
    flash.value = {}
  }

  return { flash, clearFlash }
}

export type UseFlashType = ReturnType<typeof useFlash>
