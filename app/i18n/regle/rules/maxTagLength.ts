import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { maxTagLength as maxTagLengthR } from '~/lib/validation/rules'

export const maxTagLength = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(maxTagLengthR, ({ $params: [size] }) =>
    t('regle.rules.maxTagLength', { size }),
  )
}
