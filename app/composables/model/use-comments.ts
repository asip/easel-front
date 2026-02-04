import type { Comment, CommentResource, CommentsResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export function useComments() {
  const { create } = useEntity<Comment, CommentResource>()

  const { formatHtmlTZ } = useTimeZone()
  const { flash, clearFlash } = useFlash()

  const upCommentTZ = (comment: Comment): void => {
    comment.created_at = formatHtmlTZ(comment.created_at)
    comment.updated_at = formatHtmlTZ(comment.updated_at)
  }

  const makeComment = ({ from }: { from: CommentResource }): Comment => {
    const comment: Comment = create({ from})
    upCommentTZ(comment)
    return comment
  }

  const comments = useState<Comment[]>('comments', () => { return [] })

  const { setAlert } = useAlert({ flash })

  const getComments = async (frameId: number | null |undefined, options?: { client?: boolean }): Promise<void> => {
    // console.log(comment.frame_id);
    const { data, error } = await useQueryApi<CommentsResource, ErrorsResource<ErrorMessages<string>>>({
      url: `/frames/${frameId}/comments`,
      client: options?.client
    })

    clearFlash()

    if (error) {
      setAlert({ error })
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
