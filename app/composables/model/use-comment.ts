import type { Comment, CommentResource, CommentsResource, Flash } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type ErrorProperty = 'body' | 'base'
type ExternalErrorProperty = 'body'

export function useComment () {
  const { empty2pbr, pbr2empty } = useQuill()
  const { copy, create } = useEntity<Comment, CommentResource>()

  const { formatHtmlTZ } = useTimeZone()
  const { flash, clearFlash } = useFlash()
  const { accessToken, clearLoginUser } = useAccount()

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

  const body = computed({
    get () {
      return empty2pbr(comment.value.body)
    },
    set (value: string | undefined) {
      comment.value.body = pbr2empty(value)
    }
  })

  const upCommentTZ = (comment: Comment) => {
    comment.created_at = formatHtmlTZ(comment.created_at)
    comment.updated_at = formatHtmlTZ(comment.updated_at)
  }

  const makeComment = ({ from }: { from: CommentResource }): Comment => {
    const comment: Comment = create({ from})
    upCommentTZ(comment)
    return comment
  }

  const setComment = ({ from, to } : { from?: Comment | CommentResource | undefined, to?: Comment}) => {
    if (from) {
      copy({ from, to: comment.value })
    } else if (to) {
      copy({ from: comment.value, to })
      // globalThis.console.log(comment.value)
      // globalThis.console.log(to)
    }
  }

  const comments: Ref<Comment[]> = useState<Comment[]>('comments', () => { return [] })

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    body: [],
    base: []
  })

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.body = errors.body ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.body = []
    externalErrors.value.base = []
  }

  const { setAlert } = useAlert({ flash, caller: { clearLoginUser, setExternalErrors } })

  const processing = ref<boolean>(false)

  const getComments = async (frameId: number | null |undefined, options?: { more?: boolean,  }) => {
    // console.log(comment.frame_id);
    const { data, error } = await useGetApi<CommentsResource>({
      url: `/frames/${frameId}/comments`,
      more: options?.more
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
          comments.value.push(makeComment({ from: commentAttrs }))
        }
        // console.log(comments);
      }
    }
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

      setComment({ from: commentAttrs })
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
    processing.value = true

    const { error, pending } = await useDeleteApi({
      url: `/comments/${comment.id}`,
      token: accessToken.value
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    }

    processing.value = pending
  }

  return {
    comment,
    body,
    setComment,
    comments,
    externalErrors,
    getComments,
    createComment,
    updateComment,
    deleteComment,
    processing,
    isSuccess,
    flash
  }

}

export type UseCommentType = ReturnType<typeof useComment>
