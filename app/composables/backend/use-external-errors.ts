import type { Flash } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export function useExternalErrors<ErrorProperty extends string>({ flash } : { flash: Ref<Flash> }) {
  const externalErrors = ref<ErrorMessages<ErrorProperty>>({})

  const clearExternalErrors = (): void => {
    for(const key in externalErrors.value){
      externalErrors.value[key] = []
    }
  }

  const setExternalErrors = (from: ErrorMessages<string>): void => {
    for(const key in from) {
      externalErrors.value[key] = from[key] ?? []
    }
  }

  const isSuccess = (): boolean => {
    let result = true

    for(const key in externalErrors.value){
      if (externalErrors.value[key].length > 0) result = false
    }

    if (flash.value.alert) result = false

    return result
  }

  return {
    externalErrors, setExternalErrors, clearExternalErrors, isSuccess
  }
}
