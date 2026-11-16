import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const maxLength = () => {
  const { $i18n } = useNuxtApp()
  const { t } = $i18n as Composer

  return r.withMessage(r.maxLength, ({ $params: [max] }) => t('regle.rules.maxLength', { max }))
}
