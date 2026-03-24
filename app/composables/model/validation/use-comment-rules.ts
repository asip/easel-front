import { required } from '@regle/rules'

export const useCommentRules = function () {
  const commentRules = {
    body: { required },
  }

  return { commentRules }
}
