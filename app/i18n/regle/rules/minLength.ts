import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const minLength = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.minLength, ({ $params: [min] }) => t('regle.rules.minLength', { min }))
}
