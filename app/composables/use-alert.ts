import type { NuxtError } from "#app"
import type { ErrorsResource, Flash } from "~/interfaces";
import type { ErrorMessages } from "~/types";

type UseAlertOptions<T extends string> = {
  flash: Flash
  clear?: () => void
  set?: (errors: ErrorMessages<T>) => void
}

type AlertOptions = {
  error: NuxtError, off?: boolean
}

export function useAlert<T extends string>({ flash, clear, set } : UseAlertOptions<T>) {
  const { $i18n } = useNuxtApp()

  const setAlert = function({ error, off = false } : AlertOptions) {
    if (off) {
      switch (error.statusCode) {
        case 401:
          // flash.value.alert = $i18n.t('action.error.login')
          if (clear) clear()
          break
        // default:
        //  flash.value.alert = error.value.message
      }
    } else {
      switch (error.statusCode) {
        case 401:
          flash.alert = $i18n.t('action.error.login')
          if (clear) clear()
          break
        case 404:
          flash.alert = error.message
          break
        case 422:
          {
            if (set) {
              const { errors } = error.data as ErrorsResource<ErrorMessages<T>>
              if (errors) {
                set(errors)
              }
            }
            break
          }
        default:
          flash.alert = error.message
      }
    }
  }

  return { setAlert }
}
