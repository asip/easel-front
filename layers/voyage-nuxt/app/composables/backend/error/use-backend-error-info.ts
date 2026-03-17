import type { BackendErrorInfo } from '../../../interfaces'

export function useBackendErrorInfo<R extends object>() {
  const info = ref<BackendErrorInfo<R>>({})

  const backendErrorInfo = computed<BackendErrorInfo<R>>(() => {
    return info.value as BackendErrorInfo<R>
  })

  const clearBackendErrorInfo = (): void => {
    info.value = {}
  }

  return { backendErrorInfo, clearBackendErrorInfo }
}
