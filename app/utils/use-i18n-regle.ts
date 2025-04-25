import { defineRegleConfig } from '@regle/core'
import { required, minLength, maxLength, email, sameAs } from '@regle/rules'

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => ({
    required: withMessage(required, () => i18n.global.t('rules.required')),
    minLength: withMessage(minLength, ({ $params: [minValue] }) => i18n.global.t('rules.minLength',{ min: minValue })),
    maxLength: withMessage(maxLength, ({ $params: [maxValue] }) =>  i18n.global.t('rules.maxLength', { max: maxValue })),
    email: withMessage(email, () => i18n.global.t('rules.email')),
    sameAs: withMessage(sameAs, () => i18n.global.t('rules.sameAs')),
    tagArrayLength: withMessage(tagArrayLength, ({ $params: [sizeValue] }) => i18n.global.t('rules.tagArrayLength', { size: sizeValue })),
    tagLength: withMessage(tagLength, ({ $params: [sizeValue] }) => i18n.global.t('rules.tagLength', { size: sizeValue }))
  })
})
