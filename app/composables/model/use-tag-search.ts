import type { TagsResource, ErrorsResource, ErrorMessages, QueryApiOptions } from '~/types'

export const useTagSearch = function () {
  const { queryApi } = useApi()

  const { flash, clearFlash } = useFlash()
  const { backendErrorInfo } = useApiError(flash)

  const tags = ref<string[]>([])

  const { accountToken } = useAccount()

  const searchTag = async (name: string, { signal }: { signal: AbortSignal }): Promise<void> => {
    const options: QueryApiOptions = {
      query: { q: name },
      token: accountToken.value,
      signal,
      cache: false,
    }

    const { data, error } = await queryApi<
      TagsResource,
      ErrorsResource<ErrorMessages<string>>
    >('/tags/search', options)

    clearFlash()

    if (error) {
      backendErrorInfo.value = error
      tags.value = []
    } else if (data) {
      const { tags: tagList } = data
      // console.log(frameList
      tags.value = tagList
      // accountToken.value = token
    }
  }

  return { searchTag, tags }
}
