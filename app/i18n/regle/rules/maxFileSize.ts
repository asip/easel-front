import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { formatFileSize } from './util/formatFileSize'

export const maxFileSize = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.maxFileSize, ({ $params: [maxSize] }) =>
    t('regle.rules.maxFileSize', { max: formatFileSize(maxSize) }),
  )
}
