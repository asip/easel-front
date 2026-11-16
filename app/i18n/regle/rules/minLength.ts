import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const minLength = () => {
  const { $i18n } = useNuxtApp()
  const { t } = $i18n as Composer

  return r.withMessage(r.minLength, ({ $params: [min] }) => t('regle.rules.minLength', { min }))
}
