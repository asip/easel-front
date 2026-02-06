import type { TagsResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export const useTagSearch = () => {
  const { flash, clearFlash } = useFlash()
  const { setAlert } = useAlert({ flash })

  const tags = ref<string[]>([])

  const searchTag = async (name: string, { abort }: { abort: AbortController }): Promise<void> => { 
    const getOptions: QueryAPIOptions = {
      url: '/tags/search',
      query: { q: name },
      abort,
      cache: false,
    }

    const { data, error } = await useQueryApi<TagsResource, ErrorsResource<ErrorMessages<string>>>(getOptions)

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const { tags: tagList } = data
      // console.log(frameList)

      if (tagList) {
        tags.value = tagList
      }
    }
  }

  return { searchTag, tags }
}
