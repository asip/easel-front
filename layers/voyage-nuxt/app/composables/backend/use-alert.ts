import { useNuxtApp } from 'nuxt/app'

import type { FetchError } from 'ofetch'
import type { NuxtError } from 'nuxt/app'

import type { Ref } from 'vue'

import type {
  ErrorsResource,
  BackendErrorInfo,
  BackendErrorResource,
  Flash,
} from '../../../interfaces'
import type { ErrorMessages } from '../../../types'

import { useBackendErrorInfo } from './error'

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  externalErrors?: Ref<ErrorMessages<string>>
  clearAccount?: () => void
}

export function useAlert<BER extends object = BackendErrorResource>({
  flash,
  caller,
}: UseAlertOptions): {
  backendErrorInfo: Ref<BackendErrorInfo<BER>, BER>
  setError: (
    error:
      | NuxtError<ErrorsResource<ErrorMessages<string>> | BER>
      | FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
    options?: {
      off?: boolean
    },
  ) => void
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $i18n } = useNuxtApp() as any
  const { backendErrorInfo, clearBackendErrorInfo } = useBackendErrorInfo<BER>()

  const setError = function (
    error:
      | NuxtError<ErrorsResource<ErrorMessages<string>> | BER>
      | FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
    options?: { off?: boolean },
  ): void {
    const off = options?.off ?? false

    clearBackendErrorInfo()
    backendErrorInfo.value.status = error.status
    if (off) {
      switch (error.status) {
        case 401:
          // flash.value.alert = $i18n.t('backend.error.login')
          if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
          break
        // default:
        //  flash.value.alert = $i18n.t('backend.error.api', { message: error.message })
      }
    } else {
      switch (error.status) {
        case 401:
          flash.value.alert = $i18n.t('backend.error.login')
          if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
          break
        case 404:
          {
            const backendError = error.data as BER
            backendErrorInfo.value.error = backendError
          }
          break
        case 422: {
          if (caller && 'externalErrors' in caller && caller.externalErrors && error.data) {
            const { errors } = error.data as ErrorsResource<ErrorMessages<string>>
            // globalThis.console.log(errors)
            caller.externalErrors.value = errors
          }
          break
        }
        default:
          flash.value.alert = $i18n.t('backend.error.api', { message: error.message })
      }
    }
  }

  return { backendErrorInfo, setError }
}

export type UseAlertType = ReturnType<typeof useAlert>
