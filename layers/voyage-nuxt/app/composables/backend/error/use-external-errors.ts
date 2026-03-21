import type { Flash } from '../../../../interfaces'
import type { ErrorMessages } from '../../../../types'

export function useExternalErrors<P extends string>({ flash }: { flash: Ref<Flash> }) {
  const errors = ref<ErrorMessages<P>>({})

  const externalErrors = computed<ErrorMessages<P>>({
    get() {
      return errors.value as ErrorMessages<string>
    },
    set(value: ErrorMessages<P>) {
      if (errors.value) {
        for (const key in value) {
          ;(errors.value as ErrorMessages<P>)[key] = value[key] ?? []
        }
      }
    },
  })

  const clearExternalErrors = (): void => {
    externalErrors.value = {}
  }

  const isSuccess = (): boolean => {
    let result = true

    for (const key in errors.value) {
      const error = errors.value as ErrorMessages<string>
      if ((error[key] as string[]).length > 0) result = false
    }

    if (flash.value.alert) result = false

    return result
  }

  return {
    externalErrors,
    clearExternalErrors,
    isSuccess,
  }
}
