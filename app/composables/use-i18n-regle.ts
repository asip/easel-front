import { defineRegleConfig } from '@regle/core'
import { required, minLength, maxLength, maxFileSize, email, sameAs } from '@regle/rules'

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => {
    const { $i18n } = useNuxtApp()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { t } = $i18n as any

    return {
      required: withMessage(required, () => t('rules.required')),
      minLength: withMessage(minLength, ({ $params: [min] }) => t('rules.minLength', { min })),
      maxLength: withMessage(maxLength, ({ $params: [max] }) => t('rules.maxLength', { max })),
      email: withMessage(email, () => t('rules.email')),
      sameAs: withMessage(sameAs, ({ $params: [_, otherName = 'other'] }) =>
        t('rules.sameAs', { otherName }),
      ),
      maxFileSize: withMessage(maxFileSize, ({ $params: [maxSize] }) =>
        t('rules.maxFileSize', { max: maxSize / (1000 * 1000) }),
      ),
      maxTagArrayLength: withMessage(maxTagArrayLength, ({ $params: [size] }) =>
        t('rules.maxTagArrayLength', { size: size }),
      ),
      maxTagLength: withMessage(maxTagLength, ({ $params: [size] }) =>
        t('rules.maxTagLength', { size }),
      ),
    }
  },
})
