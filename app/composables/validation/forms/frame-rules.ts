import { required, minLength, maxLength } from '@regle/rules'

export const frameRules = {
  name: {
    required: withMessage(required, () => i18n.global.t('rules.required')),
    minLength: withMessage(minLength(1), () => i18n.global.t('rules.minLength',{ min: 1 })),
    maxLength: withMessage(maxLength(30), () =>  i18n.global.t('rules.maxLength', { max: 30 }))
  },
  tags: {
    tagArrayLength: withMessage(tagArrayLength(5), () => i18n.global.t('rules.tagArrayLength', { size: 5 })),
    tagLength: withMessage(tagLength(10), () => i18n.global.t('rules.tagLength', { size: 10 }))
  }
}
