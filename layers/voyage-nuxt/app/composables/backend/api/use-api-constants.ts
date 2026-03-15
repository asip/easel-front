import { useRuntimeConfig } from 'nuxt/app'

import { computed } from 'vue'

export const useApiConstants = () => {
  const runtimeConfig = useRuntimeConfig()

  const baseOrigin = computed<string | undefined>(() => {
    if (import.meta.client) {
      return runtimeConfig.public.backendApiOrigin as string
    } else if (import.meta.server) {
      return runtimeConfig.backendApiOrigin as string
    }
  })

  const basePath = runtimeConfig.public.backendApiPath as string

  const baseURL = computed<string>(() => `${baseOrigin.value}${basePath}`)

  return { baseURL }
}
