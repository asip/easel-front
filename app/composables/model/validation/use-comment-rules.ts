import { required } from '@regle/rules'

export const useCommentRules = () => {
  const commentRules = {
    body: { required },
  }

  return { commentRules }
}
