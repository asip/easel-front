import type { FetchError } from 'ofetch'
import type { NuxtError } from '#app'

import type { ErrorsResource, BackendErrorResource, Flash } from '~/interfaces';
import type { ErrorMessages } from '~/types';

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  setExternalErrors?: (from: ErrorMessages<string>) => void
  clearLoginUser?: () => void
}

type AlertOptions = {
  error: NuxtError<ErrorsResource<ErrorMessages<string>> | BackendErrorResource> | FetchError<ErrorsResource<ErrorMessages<string>> | BackendErrorResource>, off?: boolean
}

export function useAlert({ flash, caller }: UseAlertOptions) {
  const { $i18n } = useNuxtApp()
  const { backendErrorInfo, clearBackendErrorInfo, setBackendErrorInfo } = useBackendErrorInfo()

  const setAlert = function({ error, off = false }: AlertOptions): void {
    clearBackendErrorInfo()
    backendErrorInfo.value.status = error.statusCode
    if (off) {
      switch (error.statusCode) {
        case 401:
          // flash.value.alert = $i18n.t('action.error.login')
          if (caller && 'clearLoginUser' in caller){
            if (caller.clearLoginUser) caller.clearLoginUser()
          }
          break
        // default:
        //  flash.value.alert = $i18n.t('action.error.api', { message: error.message })
      }
    } else {
      switch (error.statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          if (caller && 'clearLoginUser' in caller){
            if (caller.clearLoginUser) caller.clearLoginUser()
          }
          break
        case 404:
          {
            const backendError = error.data as BackendErrorResource
            setBackendErrorInfo(backendError)
          }
          break
        case 422:
          {
            if (caller && 'setExternalErrors' in caller && error.data) {
              const { errors } = error.data as ErrorsResource<ErrorMessages<string>>
              // globalThis.console.log(errors)
              if (caller.setExternalErrors) caller.setExternalErrors(errors)
            }
            break
          }
        default:
          flash.value.alert = $i18n.t('action.error.api', { message: error.message })
      }
    }
  }

  const copyErrors = (errors: ErrorMessages<string>, externalErrors: Ref<ErrorMessages<string>>): void => {
    for(const key in errors) {
      externalErrors.value[key] = errors[key] ?? []
    }
  }

  return { backendErrorInfo, setAlert }
}

export type UseAlertType = ReturnType<typeof useAlert>
