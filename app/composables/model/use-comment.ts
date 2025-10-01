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

  const comments: Ref<Comment[]> = ref<Comment[]>([])

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

  const getComments = async (options?: { fresh?: boolean }) => {
    // console.log(comment.frame_id);
    const { response, error } = await useGetApi<CommentsResource>({
      url: `/frames/${comment.value.frame_id}/comments`,
      fresh: options?.fresh
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    } else if (response) {
      const { comments: commentList } = response
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

  const postComment = async () => {
    processing.value = true

    const postData = {
      comment: {
        body: comment.value.body
      }
    }

    const { response, error, pending } = await usePostApi<CommentResource>({
      url: `/frames/${comment.value.frame_id}/comments`,
      body: postData,
      token: accessToken.value
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setAlert({ error })
    } else if (response) {
      const commentAttrs = response
      if (commentAttrs) {
        comment.value.body = ''
      }
    }

    processing.value = pending
  }

  const createComment = async () => {
    // console.log(comment.userId);
    // console.log(comment.frameId);
    // console.log(comment.body);
    await postComment()

    if (isSuccess()) {
      comments.value.splice(0)
    }
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
    comments,
    externalErrors,
    getComments,
    createComment,
    deleteComment,
    processing,
    isSuccess,
    flash
  }
}

export type UseCommentType = ReturnType<typeof useComment>
