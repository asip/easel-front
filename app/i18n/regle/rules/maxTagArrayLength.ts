import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { maxTagArrayLength as maxTagArrayLengthR } from '~/lib/validation/rules'

export const maxTagArrayLength = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(maxTagArrayLengthR, ({ $params: [size] }) =>
    t('regle.rules.maxTagArrayLength', { size: size }),
  )
}
