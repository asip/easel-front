import { required } from '@regle/rules'

export const commentRules = {
  body: {
    required: withMessage(required, () => i18n.global.t('rules.required'))
  }
}

