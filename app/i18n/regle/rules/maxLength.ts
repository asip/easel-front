import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const maxLength = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.maxLength, ({ $params: [max] }) => t('regle.rules.maxLength', { max }))
}
