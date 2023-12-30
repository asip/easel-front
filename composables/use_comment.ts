import { useLoginUser } from './use_login_user'
import { useFlash } from './use_flash'
import { useGetApi } from './api/use_get_api'
import { usePostApi } from './api/use_post_api'
import { useDeleteApi } from './api/use_delete_api'
import { useLocale } from '~/composables/use_locale'
import { required } from '~/utils/i18n-validators'
import type { Comment } from '~/interfaces/comment'

const cm_rules = {
  body: { required }
}

export function useComment () {
  const comment: Comment = reactive<Comment>({
    id: 0,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    updated_at: null
  })

  const comments: Comment[] = reactive<Comment[]>([])

  interface ErrorMessages{
    body: string[]
    base: string[]
  }

  const error_messages = reactive<ErrorMessages>({
    body: [],
    base: []
  })

  const processing = ref<boolean>(false)

  const { $i18n } = useNuxtApp()

  const { backendApiURL } = useConstants()

  const { locale } = useLocale()
  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const getComments = async () => {
    // console.log(comment.frame_id);
    const { data, error } = await useGetApi({
      key: 'get_comments',
      url: `${backendApiURL.value}/frames/${comment.frame_id}/comments`
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
      const { data: commentList } = data.value as any
      // console.log(commentList)

      if (commentList) {
        // console.log(comment_list);
        comments.splice(0)
        for (const commentAttrs of commentList as any[]) {
          // console.log(comment);
          comments.push(createCommentFromJson(commentAttrs.attributes))
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
        body: comment.body
      }
    }

    const { data, error, pending } = await usePostApi({
      key: 'post_comment',
      url: `${backendApiURL.value}/frames/${comment.frame_id}/comments`,
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
      const { data: commentAttrs, errors } = data.value as any
      if (commentAttrs) {
        comment.body = ''
      } else if (errors) {
        setErrorMessages(errors)
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
      comments.splice(0)
    }
  }

  const setErrorMessages = (errors: any) => {
    if (errors.body) {
      error_messages.body = errors.body
    } else {
      error_messages.body = []
    }
  }

  const clearErrorMessages = () => {
    error_messages.body = []
    error_messages.base = []
  }

  const isSuccess = () => {
    let result = true

    if (error_messages.body.length > 0 || error_messages.base.length > 0) {
      result = false
    }

    if (flash.value.alert) {
      result = false
    }

    return result
  }

  const deleteComment = async (comment: Comment, idx: number) => {
    const { error } = await useDeleteApi({
      key: 'delete_comment',
      url: `${backendApiURL.value}/comments/${comment.id}`,
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

    if (isSuccess()) {
      comments.splice(idx, 1)
    }
  }

  return {
    comment,
    comments,
    error_messages,
    getComments,
    cm_rules,
    createComment,
    deleteComment,
    processing,
    isSuccess,
    flash,
    locale
  }
}
