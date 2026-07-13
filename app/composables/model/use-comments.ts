import type { Comment, CommentResource, CommentsResource, BackendErrorsResource } from '~/types'

export const useComments = function () {
  const { queryApi } = useApi()

  const { create } = useEntity<Comment, CommentResource>()

  const { formatTZ } = useTimeZone()
  const { flash, clearFlash } = useFlash()

  const upCommentTZ = (comment: Comment): void => {
    comment.created_at = formatTZ(comment.created_at, 'YYYY/MM/DD (ddd) HH:mm')
    comment.updated_at = formatTZ(comment.updated_at, 'YYYY/MM/DD (ddd) HH:mm')
  }

  const makeComment = ({ from }: { from: CommentResource }): Comment => {
    const comment: Comment = create({ from })
    upCommentTZ(comment)
    return comment
  }

  const comments = useState<Comment[]>('comments', () => {
    return []
  })

  const { backendErrorInfo } = useApiError(flash)

  const getComments = async (
    frameId: number | null | undefined,
    options?: { cache?: boolean },
  ): Promise<void> => {
    // console.log(comment.frame_id);
    const { data, error } = await queryApi<CommentsResource, BackendErrorsResource>(
      `/frames/${frameId}/comments`,
      {
        cache: options?.cache ?? true,
      },
    )

    clearFlash()

    if (error) {
      backendErrorInfo.value = error
    } else if (data) {
      const { comments: commentList } = data
      // console.log(commentList)

      if (commentList) {
        // console.log(comment_list);
        comments.value.splice(0)
        for (const commentAttrs of commentList) {
          // console.log(comment);
          comments.value.push(makeComment({ from: commentAttrs }))
        }
        // console.log(comments);
      }
    }
  }

  return { comments, getComments, flash }
}
