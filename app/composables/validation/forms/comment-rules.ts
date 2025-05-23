import { required, maxLength } from '@regle/rules'

export const commentRules = {
  body: { required, maxLength: maxLength(255) }
}

