import { useLoginUser } from './use_login_user'
import { useFlash } from './use_flash'
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

  const nuxtApp = useNuxtApp()

  const { backendApiURL } = useConstants()

  const { locale } = useLocale()
  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const getComments = async () => {
    let statusCode!: number

    // console.log(comment.frame_id);
    const { data, error } = await useAsyncData('get_comments', () =>
      $fetch(`${backendApiURL.value}/frames/${comment.frame_id}/comments`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    clearFlash()

    if (error.value) {
      switch (statusCode) {
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
        comments.splice(0, comments.length)
        for (const comment of commentList) {
          // console.log(comment);
          comments.push(createCommentFromJson(comment))
        }
        // console.log(comments);
      }
    }
  }

  const createCommentFromJson = (row_data: any): Comment => {
    const comment: Partial<Comment> = {}
    comment.id = row_data.id
    Object.assign(comment, row_data.attributes)
    return comment as Comment
  }

  const postComment = async () => {
    const postData = {
      comment: {
        body: comment.body
      }
    }

    let statusCode!: number

    const { data, error } = await useAsyncData('post_comment', () =>
      $fetch(`${backendApiURL.value}/frames/${comment.frame_id}/comments`,
        {
          method: 'post',
          body: postData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': locale.value,
            Authorization: `Bearer ${login_user.value.token}`
          },
          async onResponse ({ response }) {
            statusCode = response.status
          }
        }
      )
    )

    clearFlash()
    clearErrorMessages()

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = nuxtApp.$i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { data: commentJson, errors } = data.value as any
      if (commentJson) {
        comment.body = ''
      } else if (errors) {
        setErrorMessages(errors)
      }
    }
  }

  const createComment = async () => {
    // console.log(comment.userId);
    // console.log(comment.frameId);
    // console.log(comment.body);
    await postComment()

    if (isSuccess()) {
      comments.splice(0, comments.length)
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
    let statusCode!: number

    const { error } = await useAsyncData('delete_comment', () =>
      $fetch(`${backendApiURL.value}/comments/${comment.id}`,
        {
          method: 'delete',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': locale.value,
            Authorization: `Bearer ${login_user.value.token}`
          },
          async onResponse ({ response }) {
            statusCode = response.status
          }
        }
      )
    )

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 404:
          flash.value.alert = error.value.message
          break
        case 401:
          flash.value.alert = nuxtApp.$i18n.t('action.error.login')
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
    isSuccess,
    flash,
    locale
  }
}
