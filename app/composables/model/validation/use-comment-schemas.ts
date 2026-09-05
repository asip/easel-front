import { required } from '@regle/rules'

export const useCommentSchemas = function () {
  const commentSchema = {
    body: { required },
  }

  return { commentSchema }
}
