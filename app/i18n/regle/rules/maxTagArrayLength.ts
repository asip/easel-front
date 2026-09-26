import * as r from '@regle/rules'

import { maxTagArrayLength as maxTagArrayLengthR } from '~/lib/validation/rules'

export const maxTagArrayLength = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(maxTagArrayLengthR, ({ $params: [size] }) =>
    t('regle.rules.maxTagArrayLength', { size: size }),
  )
}
