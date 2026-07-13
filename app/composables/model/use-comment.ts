import type {
  Comment,
  CommentResource,
  CommentErrorProperty,
  BackendErrorResource,
  BackendErrorsResource,
} from '~/types'

export const useComment = function () {
  const { mutationApi } = useApi()

  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any

  const { empty2p, p2empty } = useTiptap()
  const { copy } = useEntity<Comment, CommentResource>()

  const { flash, clearFlash } = useFlash()
  const { accountToken, clearAccount } = useAccount()

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

  const body = computed<string>({
    get() {
      return empty2p(comment.value.body)
    },
    set(value: string | undefined) {
      comment.value.body = p2empty(value)
    },
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

  const { externalErrors, clearExternalErrors, success } =
    useExternalErrors<CommentErrorProperty>(flash)

  const { backendErrorInfo } = useApiError(flash, {
    caller: { externalErrors, clearAccount },
  })

  const set404Alert = (): void => {
    if (backendErrorInfo.value.status == 404) {
      if ((backendErrorInfo.value.error as BackendErrorResource).source == 'Frame') {
        flash.value.alert = t('backend.error.not_found', { source: t('misc.page') })
      } else if ((backendErrorInfo.value.error as BackendErrorResource).source == 'Comment') {
        flash.value.alert = t('backend.error.not_found', {
          source: t('models.comment'),
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

    const { token, error, pending } = await mutationApi<CommentResource, BackendErrorsResource>(
      `/frames/${comment.value.frame_id}/comments`,
      {
        method: 'post',
        body: postData,
        token: accountToken.value,
      },
    )

    clearFlash()
    clearExternalErrors()

    if (error) {
      backendErrorInfo.value = error
    } else {
      accountToken.value = token
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

    const { token, data, error, pending } = await mutationApi<
      CommentResource,
      BackendErrorsResource
    >(`/frames/${comment.value.frame_id}/comments/${comment.value.id}`, {
      method: 'put',
      body: postData,
      token: accountToken.value,
    })

    clearFlash()
    clearExternalErrors()

    if (error) {
      backendErrorInfo.value = error
    } else if (data) {
      const commentAttrs = data

      setComment({ from: commentAttrs })
      accountToken.value = token
    }

    processing.value = pending
  }

  const deleteComment = async (comment: Comment): Promise<void> => {
    processing.value = true

    const { token, error, pending } = await mutationApi<CommentResource, BackendErrorsResource>(
      `/frames/${comment.frame_id}/comments/${comment.id}`,
      {
        method: 'delete',
        token: accountToken.value,
      },
    )

    clearFlash()

    if (error) {
      backendErrorInfo.value = error
    } else {
      accountToken.value = token
    }

    processing.value = pending
  }

  return {
    comment,
    body,
    setComment,
    externalErrors,
    backendErrorInfo,
    createComment,
    updateComment,
    deleteComment,
    processing,
    success,
    set404Alert,
    flash,
  }
}

export type UseCommentType = ReturnType<typeof useComment>
