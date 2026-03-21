import type { Flash } from '../../interfaces'

import { ref } from 'vue'

export function useFlash() {
  const flash = ref<Flash>({})

  const clearFlash = (): void => {
    flash.value = {}
  }

  return { flash, clearFlash }
}

export type UseFlashType = ReturnType<typeof useFlash>
