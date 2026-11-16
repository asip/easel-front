import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const maxFileSize = () => {
  const { $i18n } = useNuxtApp()
  const { t } = $i18n as Composer

  return r.withMessage(r.maxFileSize, ({ $params: [maxSize] }) =>
    t('regle.rules.maxFileSize', { max: maxSize / (1000 * 1000) }),
  )
}
