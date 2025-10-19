import type { Comment, CommentResource, CommentsResource, Flash } from '~/interfaces'
import type { ErrorMessages } from '~/types'

type ErrorProperty = 'body' | 'base'
type ExternalErrorProperty = 'body'

export function useComment () {
  const { formatTZ } = useTimeZone()
  const { empty2pbr, pbr2empty } = useQuill()
  const { copy, create } = useEntity<Comment, CommentResource>()

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
    updated_at: null
  })

  const upCommentTZ = (comment: Comment) => {
    comment.created_at = formatTZ(comment.created_at)
    comment.updated_at = formatTZ(comment.updated_at)
  }

  const createComment = ({ from }: { from: CommentResource }): Comment => {
    const comment: Comment = create({ from})
    upCommentTZ(comment)
    return comment
  }

  const setComment = ({ from }: { from: CommentResource }) => {
    copy({ from, to: comment.value})
  }

  const UseComment = class {
    flash: Ref<Flash>

    clearLoginUser: UseAccountType['clearLoginUser']
    #setAlert: UseAlertType['setAlert']

    comment: Ref<Comment>

    constructor() {
      const { setAlert } = useAlert({ flash, caller: this })

      this.flash = flash

      this.clearLoginUser = clearLoginUser
      this.#setAlert = setAlert

      this.comment = comment
    }

    body = computed({
      get () {
        return empty2pbr(comment.value.body)
      },
      set (value: string | undefined) {
        comment.value.body = pbr2empty(value)
      }
    })

    comments: Ref<Comment[]> = useState<Comment[]>('comments', () => { return [] })

    externalErrors = ref<ErrorMessages<ErrorProperty>>({
      body: [],
      base: []
    })

    processing = ref<boolean>(false)

    setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
      this.externalErrors.value.body = errors.body ?? []
    }

    clearExternalErrors = () => {
      this.externalErrors.value.body = []
      this.externalErrors.value.base = []
    }

    getComments = async (frameId: number | null |undefined, options?: { fresh?: boolean }) => {
      // console.log(comment.frame_id);
      const { data, error } = await useGetApi<CommentsResource>({
        url: `/frames/${frameId}/comments`,
        fresh: options?.fresh
      })

      clearFlash()

      if (error) {
        this.#setAlert({ error })
      } else if (data) {
        const { comments: commentList } = data
        // console.log(commentList)

        if (commentList) {
          // console.log(comment_list);
          this.comments.value.splice(0)
          for (const commentAttrs of commentList) {
            // console.log(comment);
            this.comments.value.push(createComment({ from: commentAttrs }))
          }
          // console.log(comments);
        }
      }
    }

    createComment = async () => {
      this.processing.value = true

      const postData = {
        comment: {
          body: comment.value.body
        }
      }

      const { error, pending } = await usePostApi<CommentResource>({
        url: `/frames/${comment.value.frame_id}/comments`,
        body: postData,
        token: accessToken.value
      })

      clearFlash()
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      }
      /* else if (data) {
        const commentAttrs = data
      } */

      this.processing.value = pending
    }

    setComment = ({ from, to } : { from?: Comment | undefined, to?: Comment}) => {
      if (from) {
        copy({ from, to: comment.value })
      } else if (to) {
        copy({ from: comment.value, to })
        // globalThis.console.log(comment.value)
        // globalThis.console.log(to)
      }
    }

    updateComment = async () => {
      this.processing.value = true

      const postData = {
        comment: {
          body: comment.value.body
        }
      }

      const { data, error, pending } = await usePutApi<CommentResource>({
        url: `/frames/${comment.value.frame_id}/comments/${comment.value.id}`,
        body: postData,
        token: accessToken.value
      })

      clearFlash()
      this.clearExternalErrors()

      if (error) {
        this.#setAlert({ error })
      } else if (data) {
        const commentAttrs = data

        setComment({ from: commentAttrs })
      }

      this.processing.value = pending
    }

    isSuccess = () => {
      let result = true

      if (this.externalErrors.value.body.length > 0 || this.externalErrors.value.base.length > 0) {
        result = false
      }

      if (this.flash.value.alert) {
        result = false
      }

      return result
    }

    deleteComment = async (comment: Comment) => {
      this.processing.value = true

      const { error, pending } = await useDeleteApi({
        url: `/comments/${comment.id}`,
        token: accessToken.value
      })

      clearFlash()

      if (error) {
        this.#setAlert({ error })
      }

      this.processing.value = pending
    }
  }

  const self = new UseComment()

  return self
}

export type UseCommentType = ReturnType<typeof useComment>
