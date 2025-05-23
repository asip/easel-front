import { maxLength, required } from '@regle/rules'

export const commentRules = {
  body: { required, maxLength: maxLength(255) }
}

