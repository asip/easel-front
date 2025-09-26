import type { NuxtError } from "#app"
import type { ErrorsResource, Flash } from "~/interfaces";
import type { ErrorMessages } from "~/types";

export function useAlert<T extends string>(flash: Ref<Flash>, clear?: () => void, func?: (errors: ErrorMessages<T>)=> void) {
  const { $i18n } = useNuxtApp()

  const setAlert = function(error: NuxtError, off?: boolean) {
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
          flash.value.alert = $i18n.t('action.error.login')
          if (clear) clear()
          break
        case 404:
          flash.value.alert = error.message
          break
        case 422:
          {
            if (func) {
              const { errors } = error.data as ErrorsResource<ErrorMessages<T>>
              if (errors) {
                func(errors)
              }
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
