import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const maxFileSize = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.maxFileSize, ({ $params: [maxSize] }) =>
    t('regle.rules.maxFileSize', { max: maxSize / (1000 * 1000) }),
  )
}
