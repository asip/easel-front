import type { FetchError } from 'ofetch'
import type { NuxtError } from '#app'

import type { ErrorsResource, Flash } from '~/interfaces';
import type { ErrorMessages } from '~/types';

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  externalErrors?: Ref<ErrorMessages<string>>
  clearLoginUser?: () => void
}

type AlertOptions = {
  error: NuxtError<ErrorsResource<ErrorMessages<string>>> | FetchError<ErrorsResource<ErrorMessages<string>>>, off?: boolean
}

export function useAlert({ flash, caller }: UseAlertOptions) {
  const { $i18n } = useNuxtApp()

  const setAlert = function({ error, off = false }: AlertOptions): void {
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
          flash.value.alert = $i18n.t('action.error.api', { message: error.message })
          break
        case 422:
          {
            if (caller && 'externalErrors' in caller && error.data) {
              const { errors } = error.data
              // globalThis.console.log(errors)
              if (caller.externalErrors) copyErrors(errors, caller.externalErrors)
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

  return { setAlert }
}

export type UseAlertType = ReturnType<typeof useAlert>
