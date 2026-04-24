import type {
  Comment,
  CommentResource,
  CommentErrorProperty,
  ErrorsResource,
  ErrorMessages,
} from '~/types'

export const useComment = function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $i18n } = useNuxtApp() as any

  const { copy } = useEntity<Comment, CommentResource>()

  const { flash, clearFlash } = useFlash()
  const { accessToken, clearAccount } = useAccount()

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

  const { externalErrors, clearExternalErrors, isSuccess } =
    useExternalErrors<CommentErrorProperty>({ flash })

  const { backendErrorInfo, setError } = useApiError({
    flash,
    caller: { externalErrors, clearAccount },
  })

  const set404Alert = (): void => {
    if (backendErrorInfo.value.status == 404) {
      if (backendErrorInfo.value.error?.source == 'Frame') {
        flash.value.alert = $i18n.t('backend.error.not_found', { source: $i18n.t('misc.page') })
      } else if (backendErrorInfo.value.error?.source == 'Comment') {
        flash.value.alert = $i18n.t('backend.error.not_found', {
          source: $i18n.t('models.comment'),
        })
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
    >(`/frames/${comment.value.frame_id}/comments`, {
      method: 'post',
      body: postData,
      token: accessToken.value,
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setError(error)
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
    >(`/frames/${comment.value.frame_id}/comments/${comment.value.id}`, {
      method: 'put',
      body: postData,
      token: accessToken.value,
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      setError(error)
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
    >(`/frames/${comment.frame_id}/comments/${comment.id}`, {
      method: 'delete',
      token: accessToken.value,
    })

    clearFlash()

    if (error) {
      setError(error)
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
