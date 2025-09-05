import { defineRegleConfig } from '@regle/core'
import { required, minLength, maxLength, email, sameAs } from '@regle/rules'

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => {
    const { $i18n } = useNuxtApp()
    return {
      required: withMessage(required, () => $i18n.t('rules.required')),
      minLength: withMessage(minLength, ({ $params: [minValue] }) => $i18n.t('rules.minLength',{ min: minValue })),
      maxLength: withMessage(maxLength, ({ $params: [maxValue] }) =>  $i18n.t('rules.maxLength', { max: maxValue })),
      email: withMessage(email, () => $i18n.t('rules.email')),
      sameAs: withMessage(sameAs, () => $i18n.t('rules.sameAs')),
      tagArrayLength: withMessage(tagArrayLength, ({ $params: [sizeValue] }) => $i18n.t('rules.tagArrayLength', { size: sizeValue })),
      tagLength: withMessage(tagLength, ({ $params: [sizeValue] }) => $i18n.t('rules.tagLength', { size: sizeValue }))
    }
  }
})
