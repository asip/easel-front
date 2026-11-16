import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { maxTagArrayLength as maxTagArrayLengthR } from '~/lib/validation/rules'

export const maxTagArrayLength = () => {
  const { $i18n } = useNuxtApp()
  const { t } = $i18n as Composer

  return r.withMessage(maxTagArrayLengthR, ({ $params: [size] }) =>
    t('regle.rules.maxTagArrayLength', { size: size }),
  )
}
