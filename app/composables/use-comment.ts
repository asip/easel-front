import { useLoginUser } from './use-login-user'
import { useFlash } from './use-flash'
import { useLocale } from '~/composables/use-locale'
import type { Comment } from '~/interfaces/comment'
import type { ErrorMessages } from '~/types/error-messages'

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

  const error_messages = ref<ErrorMessages<'body' | 'base'>>({
    body: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { locale } = useLocale()
  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const getComments = async () => {
    // console.log(comment.frame_id);
    const { data, error } = await useGetApi({
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
      const { comments: commentList } = data.value as any
      // console.log(commentList)

      if (commentList) {
        // console.log(comment_list);
        comments.value.splice(0)
        for (const commentAttrs of commentList as any[]) {
          // console.log(comment);
          comments.value.push(createCommentFromJson(commentAttrs))
        }
        // console.log(comments);
      }
    }
  }

  const createCommentFromJson = (resource: any): Comment => {
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

    const { data, error, pending } = await usePostApi({
      url: `/frames/${comment.value.frame_id}/comments`,
      body: postData,
      token: login_user.value.token,
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
      const { errors } = data.value as any
      if (errors) {
        setErrorMessages(errors)
      } else {
        const commentAttrs = data.value as any
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

  const setErrorMessages = (errors: any) => {
    if (errors.body) {
      error_messages.value.body = errors.body
    } else {
      error_messages.value.body = []
    }
  }

  const clearErrorMessages = () => {
    error_messages.value.body = []
    error_messages.value.base = []
  }

  const isSuccess = () => {
    let result = true

    if (error_messages.value.body.length > 0 || error_messages.value.base.length > 0) {
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
      token: login_user.value.token,
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
    error_messages,
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
