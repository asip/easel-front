import { useLoginUser } from './use_login_user'
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

  const { backendApiURL } = useConstants()

  const { locale } = useLocale()
  const { login_user, navigateLogoutTo } = useLoginUser()

  const getComments = async () => {
    // console.log(comment.frame_id);
    const { data } = await useAsyncData('get_comments', () =>
      $fetch(`${backendApiURL.value}/frames/${comment.frame_id}/comments`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

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

  const createCommentFromJson = (row_data: any): Comment => {
    let comment: any = {}
    comment.id = row_data.id
    Object.assign(comment, row_data.attributes)
    return comment
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

    clearErrorMessages()

    if (error.value) {
      setErrorMessage(error.value)
      // @ts-ignore
      // error_messages.base= [nuxtApp.$i18n.t('action.comment.login')];
      if (statusCode === 401) {
        navigateLogoutTo('/')
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
      await getComments()
    }
  }

  const setErrorMessage = (error: any) => {
    error_messages.base.push(error)
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

    return result
  }

  const deleteComment = async (comment: any, idx: number) => {
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

    clearErrorMessages()

    if (error.value) {
      if (statusCode !== 404) {
        setErrorMessage(error.value)
      }
      // @ts-ignore
      // error_messages.base = [nuxtApp.$i18n.t('action.comment.login')];
      if (statusCode === 401) {
        navigateLogoutTo('/')
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
    locale
  }
}
