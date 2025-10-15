import type { FetchError } from 'ofetch'
import type { NuxtError } from "#app"

import type { ErrorsResource, Flash } from "~/interfaces";
import type { ErrorMessages } from "~/types";

interface UseAlertOptions<T extends UseAlertCallerType> {
  flash: Ref<Flash>
  caller?: T
}

interface UseAlertCallerType {
  setExternalErrors?: (errors: ErrorMessages<string>) => void
  clearLoginUser?: () => void
}

type AlertOptions = {
  error: NuxtError | FetchError, off?: boolean
}

export function useAlert<T extends UseAlertCallerType>({ flash, caller } : UseAlertOptions<T>) {
  const { $i18n } = useNuxtApp()

  const setAlert = function({ error, off = false } : AlertOptions) {
    if (off) {
      switch (error.statusCode) {
        case 401:
          // flash.value.alert = $i18n.t('action.error.login')
          if (caller && 'clearLoginUser' in caller){
            if (caller.clearLoginUser) caller.clearLoginUser()
          }
          break
        // default:
        //  flash.value.alert = error.value.message
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
          flash.value.alert = error.message
          break
        case 422:
          {
            if (caller && 'setExternalErrors' in caller) {
              const { errors } = error.data as ErrorsResource<ErrorMessages<string>>
              // globalThis.console.log(errors)
              if (caller.setExternalErrors) caller.setExternalErrors(errors)
            }
            break
          }
        default:
          flash.value.alert = error.message
      }
    }
  }

  return { setAlert }
}

export type UseAlertType = ReturnType<typeof useAlert>
