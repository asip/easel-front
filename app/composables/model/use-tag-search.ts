import type { TagsResource, ErrorsResource, ErrorMessages } from '~/types'

export const useTagSearch = function () {
  const { flash, clearFlash } = useFlash()
  const { setError } = useApiError({ flash })

  const tags = ref<string[]>([])

  const searchTag = async (name: string, { signal }: { signal: AbortSignal }): Promise<void> => {
    const getOptions: QueryAPIOptions = {
      query: { q: name },
      signal,
      cache: false,
    }

    const { data, error } = await useQueryApi<TagsResource, ErrorsResource<ErrorMessages<string>>>(
      '/tags/search',
      getOptions,
    )

    clearFlash()

    if (error) {
      setError(error)
      tags.value = []
    } else if (data) {
      const { tags: tagList } = data
      // console.log(frameList
      tags.value = tagList
    }
  }

  return { searchTag, tags }
}
