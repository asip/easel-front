import {useConstants} from "~/composables/use_constants";
import {CookieRef} from "#app";

export const useCsrfProtection = () => {
  const { baseApiURL } = useConstants()

  const csrf_token: CookieRef<string | null | undefined> = useCookie('csrf_token')

  const setCsrfToken = async () => {
    const { data } = await useAsyncData('check', () =>
      $fetch(`${baseApiURL}/sessions`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        async onResponse({ request, response, options }) {
          const headers = response.headers.entries()
          for(const header of  headers){
            if(header[0] == 'x-csrf-token'){
              csrf_token.value = header[1]
            }
          }
        }
      })
    )
  }

  return { setCsrfToken, csrf_token }
}