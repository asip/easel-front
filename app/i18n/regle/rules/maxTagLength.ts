import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { maxTagLength as maxTagLengthR } from '~/lib/validation/rules'

export const maxTagLength = () => {
  const { $i18n } = useNuxtApp()
  const { t } = $i18n as Composer

  return r.withMessage(maxTagLengthR, ({ $params: [size] }) =>
    t('regle.rules.maxTagLength', { size }),
  )
}
