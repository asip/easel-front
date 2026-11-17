import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const email = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.email, () => t('regle.rules.email'))
}
