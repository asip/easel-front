import type { Comment, BackendErrorInfo, BackendErrorResource } from '~/interfaces'

export const useCommentTransition = (comment: Ref<Comment>) => {
  const { getComments } = useComments()

  const redirectOrReload404 = async (
    backendErrorInfo: Ref<BackendErrorInfo<BackendErrorResource>>,
  ): Promise<void> => {
    if (backendErrorInfo.value.status == 404) {
      if (backendErrorInfo.value.error?.source == 'Frame') {
        await navigateTo(`/frames/${comment.value.frame_id}`)
        globalThis.setTimeout(() => {
          reloadNuxtApp()
        }, 2000)
      } else if (
        backendErrorInfo.value.status == 404 &&
        backendErrorInfo.value.error?.source == 'Comment'
      ) {
        await getComments(comment.value.frame_id, { cache: false })
      }
    }
  }

  return { redirectOrReload404 }
}
