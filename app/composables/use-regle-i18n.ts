import { defineRegleConfig } from '@regle/core'
import { required, minLength, maxLength, maxFileSize, email, sameAs } from '@regle/rules'

import { maxTagArrayLength, maxTagLength } from '~/lib/validation/rules'

export const { useRegle: useRegleI18n } = defineRegleConfig({
  rules: () => {
    const { $i18n } = useNuxtApp()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { t } = $i18n as any

    return {
      required: withMessage(required, () => t('regle.rules.required')),
      minLength: withMessage(minLength, ({ $params: [min] }) =>
        t('regle.rules.minLength', { min }),
      ),
      maxLength: withMessage(maxLength, ({ $params: [max] }) =>
        t('regle.rules.maxLength', { max }),
      ),
      email: withMessage(email, () => t('regle.rules.email')),
      sameAs: withMessage(sameAs, ({ $params: [_, otherName = 'other'] }) =>
        t('regle.rules.sameAs', { otherName }),
      ),
      maxFileSize: withMessage(maxFileSize, ({ $params: [maxSize] }) =>
        t('regle.rules.maxFileSize', { max: maxSize / (1000 * 1000) }),
      ),
      maxTagArrayLength: withMessage(maxTagArrayLength, ({ $params: [size] }) =>
        t('regle.rules.maxTagArrayLength', { size: size }),
      ),
      maxTagLength: withMessage(maxTagLength, ({ $params: [size] }) =>
        t('regle.rules.maxTagLength', { size }),
      ),
    }
  },
})
