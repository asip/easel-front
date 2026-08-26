import type { FrameCriteria, FrameQuery, QueryItems } from '~/types'

export const useFrameQuery = function (currentPage: ComputedRef<number>) {
  const frameQuery = useState<FrameQuery>('search.frameQuery', () => {
    return {
      items: {},
      page: 1,
      pages: 1,
      total: 1,
    }
  })

  const initFrameQuery = (q: string | undefined, page: string | undefined) => {
    if (q) {
      const items = q ? JSON.parse(q.toString()) : {}
      frameQuery.value.items.word = items.word
      frameQuery.value.items.frame_name = items.frame_name
      frameQuery.value.items.tag_name = items.tag_name
      frameQuery.value.items.user_name = items.user_name
      frameQuery.value.items.creator_name = items.creator_nam
      frameQuery.value.items.date = items.date
    }
    if (page) {
      frameQuery.value.page = Number.parseInt(page.toString())
    } else {
      frameQuery.value.page = currentPage.value
    }
  }

  const clearFrameQuery = (): void => {
    const { items } = frameQuery.value
    if (items.word) frameQuery.value.items.word = null
    if (items.frame_name) frameQuery.value.items.frame_name = null
    if (items.tag_name) frameQuery.value.items.tag_name = null
    if (items.user_name) frameQuery.value.items.user_name = null
    if (items.creator_name) frameQuery.value.items.creator_name = null
    if (items.date) frameQuery.value.items.date = null
  }

  const qItems = computed<FrameCriteria>(() => {
    const { items } = frameQuery.value

    const qItems: FrameCriteria = {}

    if (items.word) qItems.word = items.word
    if (items.frame_name) qItems.frame_name = items.frame_name
    if (items.tag_name) qItems.tag_name = items.tag_name
    if (items.user_name) qItems.user_name = items.user_name
    if (items.creator_name) qItems.creator_name = items.creator_name
    if (items.date) qItems.date = items.date

    return qItems
  })

  const queryMap = computed<QueryItems>(() => {
    const items = qItems.value
    const page = currentPage.value
    const query: QueryItems = {}

    if (Object.keys(items).length) query.q = JSON.stringify(items)
    if (page !== undefined && page != null && page !== 1) query.page = page.toString()

    return query
  })

  return { frameQuery, initFrameQuery, clearFrameQuery, qItems, queryMap }
}
