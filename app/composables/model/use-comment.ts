import type { Comment, CommentResource, CommentsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type ErrorProperty = 'body' | 'base'
type ExternalErrorProperty = 'body'

export function useComment () {

  const comment: Ref<Comment> = ref<Comment>({
    id: 0,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    created_at: '',
    updated_at: null
  })

  const { empty2pbr, pbr2empty } = useQuill()

  const body = computed({
    get () {
      return empty2pbr(comment.value.body)
    },
    set (value: string | undefined) {
      comment.value.body = pbr2empty(value)
    }
  })

  const comments: Ref<Comment[]> = useState<Comment[]>('comments', () => { return [] })

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    body: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { accessToken, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()
  const { formatTZ } = useTimeZone()

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.body = errors.body ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.body = []
    externalErrors.value.base = []
  }

  const { setAlert } = useAlert<ExternalErrorProperty>({ flash, clearLU: clearLoginUser, setEE: setExternalErrors })

  const getComments = async (frameId: number | null |undefined, options?: { fresh?: boolean }) => {
    // console.log(comment.frame_id);
    const { data, error } = await useGetApi<CommentsResource>({
      url: `/frames/${frameId}/comments`,
      fresh: options?.fresh
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const { comments: commentList } = data
      // console.log(commentList)

      if (commentList) {
        // console.log(comment_list);
        comments.value.splice(0)
        for (const commentAttrs of commentList) {
          // console.log(comment);
          comments.value.push(createCommentFromJson(commentAttrs))
        }
        // console.log(comments);
      }
    }
  }

  const upCommentTZ = (comment: Comment) => {
    comment.created_at = formatTZ(comment.created_at)
    comment.updated_at = formatTZ(comment.updated_at)
  }

  const createCommentFromJson = (resource: CommentResource): Comment => {
    const comment: Partial<Comment> = {}
    Object.assign(comment, resource)
    upCommentTZ(comment as Comment)
    return comment as Comment
  }

  const createComment = async () => {
    processing.value = true

    const postData = {
      comment: {
        body: comment.value.body
      }
    }

    const { error, pending } = await usePostApi<CommentResource>({
      url: `/frames/${comment.value.frame_id}/comments`,
      body: postData,
      token: accessToken.value
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    }
    /* else if (data) {
      const commentAttrs = data
    } */

    processing.value = pending
  }

  const setJson2Comment = (resource: CommentResource) => {
    Object.assign(comment.value, resource)
  }

  const setComment = ({ from, to } : { from?: Comment | undefined, to?: Comment}) => {
    if (from) {
      Object.assign(comment.value, from)
    } else if (to) {
      Object.assign(to, comment.value)
      // globalThis.console.log(comment.value)
      // globalThis.console.log(to)
    }
  }

  const updateComment = async () => {
    processing.value = true

    const postData = {
      comment: {
        body: comment.value.body
      }
    }

    const { data, error, pending } = await usePutApi<CommentResource>({
      url: `/frames/${comment.value.frame_id}/comments/${comment.value.id}`,
      body: postData,
      token: accessToken.value
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    } else if (data) {
      const commentAttrs = data

      setJson2Comment(commentAttrs)
    }

    processing.value = pending
  }

  const isSuccess = () => {
    let result = true

    if (externalErrors.value.body.length > 0 || externalErrors.value.base.length > 0) {
      result = false
    }

    if (flash.value.alert) {
      result = false
    }

    return result
  }

  const deleteComment = async (comment: Comment) => {
    const { error } = await useDeleteApi({
      url: `/comments/${comment.id}`,
      token: accessToken.value
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    }
  }

  return {
    comment,
    body,
    comments,
    externalErrors,
    getComments,
    createComment,
    updateComment,
    deleteComment,
    setComment,
    processing,
    isSuccess,
    flash
  }
}

export type UseCommentType = ReturnType<typeof useComment>
