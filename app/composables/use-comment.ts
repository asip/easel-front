import { useAccount } from './use-account'
import { useFlash } from './use-flash'
import { useLocale } from '~/composables/use-locale'
import type { Comment } from '~/interfaces/comment'
import type { ErrorMessages } from '~/types/error-messages'
import type { CommentResource, CommentsResource, ErrorsResource } from '~/interfaces'

export function useComment () {
  const comment: Ref<Comment> = ref<Comment>({
    id: 0,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    updated_at: null
  })

  const comments: Ref<Comment[]> = ref<Comment[]>([])

  const errorMessages = ref<ErrorMessages<'body' | 'base'>>({
    body: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { locale } = useLocale()
  const { loginUser, clearLoginUser } = useAccount()
  const { flash, clearFlash } = useFlash()

  const getComments = async () => {
    // console.log(comment.frame_id);
    const { data, error } = await useGetApi<CommentsResource>({
      url: `/frames/${comment.value.frame_id}/comments`
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
        case 500:
          flash.value.alert = error.value.message
          break
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

    const { data, error, pending } = await usePostApi<Partial<CommentResource> & Partial<ErrorsResource<ErrorMessages<'body'>>>>({
      url: `/frames/${comment.value.frame_id}/comments`,
      body: postData,
      token: loginUser.value.token,
      locale: locale.value
    })

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (error.value.statusCode) {
        case 401:
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { errors } = data.value
      if (errors) {
        setErrorMessages(errors)
      } else {
        const commentAttrs = data.value
        if (commentAttrs) {
          comment.value.body = ''
        }
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

  const setErrorMessages = (errors: ErrorMessages<'body'>) => {
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
      token: loginUser.value.token,
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
