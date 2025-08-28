import type { Comment, CommentResource, CommentsResource, ErrorsResource } from '~/interfaces'
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

  const errorMessages = ref<ErrorMessages<ErrorProperty>>({
    body: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { locale } = useLocale()
  const { accessToken, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()

  const getComments = async (options?: { fresh?: boolean }) => {
    // console.log(comment.frame_id);
    const { data, error } = await useGetApi<CommentsResource>({
      url: `/frames/${comment.value.frame_id}/comments`,
      fresh: options?.fresh
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        // case 500:
        //  flash.value.alert = error.value.message
        //  break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { comments: commentList } = data.value
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

  const createCommentFromJson = (resource: CommentResource): Comment => {
    const comment: Partial<Comment> = {}
    Object.assign(comment, resource)
    return comment as Comment
  }

  const postComment = async () => {
    processing.value = true

    const postData = {
      comment: {
        body: comment.value.body
      }
    }

    const { data, error, pending } = await usePostApi<CommentResource>({
      url: `/frames/${comment.value.frame_id}/comments`,
      body: postData,
      token: accessToken.value,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 422:
          {
            const { errors } = error.value.data as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
            if (errors) {
              setErrorMessages(errors)
            }
            break
          }
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const commentAttrs = data.value
      if (commentAttrs) {
        comment.value.body = ''
      }
    }

    processing.value = pending.value
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

  const setErrorMessages = (errors: ErrorMessages<ExternalErrorProperty>) => {
    if (errors.body) {
      errorMessages.value.body = errors.body
    } else {
      errorMessages.value.body = []
    }
  }

  const clearErrorMessages = () => {
    errorMessages.value.body = []
    errorMessages.value.base = []
  }

  const isSuccess = () => {
    let result = true

    if (errorMessages.value.body.length > 0 || errorMessages.value.base.length > 0) {
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
      token: accessToken.value,
      locale: locale.value
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 404:
          flash.value.alert = error.value.message
          break
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }
  }

  return {
    comment,
    comments,
    errorMessages,
    getComments,
    createComment,
    deleteComment,
    processing,
    isSuccess,
    flash,
    locale
  }
}

export type UseCommentType = ReturnType<typeof useComment>
