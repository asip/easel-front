import { useNuxtApp } from 'nuxt/app'

import type { FetchError } from 'ofetch'
import type { NuxtError } from 'nuxt/app'

import type { Ref } from 'vue'

import type { ErrorsResource, BackendErrorResource, Flash } from '../../interfaces'
import type { ErrorMessages } from '../../types'

import { useBackendErrorInfo } from './error'

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  setExternalErrors?: (from: ErrorMessages<string>) => void
  clearAccount?: () => void
}

type AlertOptions = {
  error:
    | NuxtError<ErrorsResource<ErrorMessages<string>> | BackendErrorResource>
    | FetchError<ErrorsResource<ErrorMessages<string>> | BackendErrorResource>
  off?: boolean
}

export function useAlert({ flash, caller }: UseAlertOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $i18n } = useNuxtApp() as any
  const { backendErrorInfo, clearBackendErrorInfo, setBackendErrorInfo } = useBackendErrorInfo()

  const setAlert = function ({ error, off = false }: AlertOptions): void {
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
            const backendError = error.data as BackendErrorResource
            setBackendErrorInfo(backendError)
          }
          break
        case 422: {
          if (caller && 'setExternalErrors' in caller && caller.setExternalErrors && error.data) {
            const { errors } = error.data as ErrorsResource<ErrorMessages<string>>
            // globalThis.console.log(errors)
            caller.setExternalErrors(errors)
          }
          break
        }
        default:
          flash.value.alert = $i18n.t('backend.error.api', { message: error.message })
      }
    }
  }

  return { backendErrorInfo, setAlert }
}

export type UseAlertType = ReturnType<typeof useAlert>
