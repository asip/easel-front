import type { TagsResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export const useTagSearch = () => {
  const { flash, clearFlash } = useFlash()
  const { setAlert } = useAlert({ flash })

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
      setAlert({ error })
      tags.value = []
    } else if (data) {
      const { tags: tagList } = data
      // console.log(frameList
      tags.value = tagList
    }
  }

  return { searchTag, tags }
}
