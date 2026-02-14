import type { Comment, CommentResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages, CommentErrorProperty } from '~/types'

export function useComment() {
  const { $i18n } = useNuxtApp()

  const { copy } = useEntity<Comment, CommentResource>()

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
    updated_at: null,
  })

  const setComment = ({
    from,
    to,
  }: {
    from?: Comment | CommentResource | undefined
    to?: Comment
  }): void => {
    if (from) {
      copy({ from, to: comment.value })
    } else if (to) {
      copy({ from: comment.value, to })
      // globalThis.console.log(comment.value)
      // globalThis.console.log(to)
    }
  }

  const { externalErrors, setExternalErrors, clearExternalErrors, isSuccess } =
    useExternalErrors<CommentErrorProperty>({ flash })

  const { backendErrorInfo, setAlert } = useAlert({
    flash,
    caller: { clearLoginUser, setExternalErrors },
  })

  const set404Alert = (): void => {
    if (backendErrorInfo.value.status == 404) {
      if (backendErrorInfo.value.source == 'Frame') {
        flash.value.alert = $i18n.t('action.error.not_found', { source: $i18n.t('misc.page') })
      } else if (backendErrorInfo.value.source == 'Comment') {
        flash.value.alert = $i18n.t('action.error.not_found', { source: $i18n.t('models.comment') })
      }
    }
  }

  const processing = ref<boolean>(false)

  const createComment = async (): Promise<void> => {
    processing.value = true

    const postData = {
      comment: {
        body: comment.value.body,
      },
    }

    const { error, pending } = await useMutationApi<
      CommentResource,
      ErrorsResource<ErrorMessages<string>>
    >({
      method: 'post',
      url: `/frames/${comment.value.frame_id}/comments`,
      body: postData,
      token: accessToken.value,
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

  const updateComment = async (): Promise<void> => {
    processing.value = true

    const postData = {
      comment: {
        body: comment.value.body,
      },
    }

    const { data, error, pending } = await useMutationApi<
      CommentResource,
      ErrorsResource<ErrorMessages<string>>
    >({
      method: 'put',
      url: `/frames/${comment.value.frame_id}/comments/${comment.value.id}`,
      body: postData,
      token: accessToken.value,
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

  const deleteComment = async (comment: Comment): Promise<void> => {
    processing.value = true

    const { error, pending } = await useMutationApi<
      CommentResource,
      ErrorsResource<ErrorMessages<string>>
    >({
      method: 'delete',
      url: `/frames/${comment.frame_id}/comments/${comment.id}`,
      token: accessToken.value,
    })

    clearFlash()

    if (error) {
      setAlert({ error })
    }

    processing.value = pending
  }

  return {
    comment,
    setComment,
    externalErrors,
    backendErrorInfo,
    createComment,
    updateComment,
    deleteComment,
    processing,
    isSuccess,
    set404Alert,
    flash,
  }
}

export type UseCommentType = ReturnType<typeof useComment>
