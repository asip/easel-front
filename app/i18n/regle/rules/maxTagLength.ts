import * as r from '@regle/rules'

import { maxTagLength as maxTagLengthR } from '~/lib/validation/rules'

export const maxTagLength = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(maxTagLengthR, ({ $params: [size] }) =>
    t('regle.rules.maxTagLength', { size }),
  )
}
