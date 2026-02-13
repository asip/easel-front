import { defineRegleConfig } from '@regle/core'
import { required, minLength, maxLength, maxFileSize, email, sameAs } from '@regle/rules'

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => {
    const { $i18n } = useNuxtApp()
    return {
      required: withMessage(required, () => $i18n.t('rules.required')),
      minLength: withMessage(minLength, ({ $params: [min] }) =>
        $i18n.t('rules.minLength', { min }),
      ),
      maxLength: withMessage(maxLength, ({ $params: [max] }) =>
        $i18n.t('rules.maxLength', { max }),
      ),
      email: withMessage(email, () => $i18n.t('rules.email')),
      sameAs: withMessage(sameAs, ({ $params: [_, otherName = 'other'] }) =>
        $i18n.t('rules.sameAs', { otherName }),
      ),
      maxFileSize: withMessage(maxFileSize, ({ $params: [maxSize] }) =>
        $i18n.t('rules.maxFileSize', { max: maxSize }),
      ),
      maxTagArrayLength: withMessage(maxTagArrayLength, ({ $params: [size] }) =>
        $i18n.t('rules.maxTagArrayLength', { size: size }),
      ),
      maxTagLength: withMessage(maxTagLength, ({ $params: [size] }) =>
        $i18n.t('rules.maxTagLength', { size }),
      ),
    }
  },
})
