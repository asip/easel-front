import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const sameAs = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.sameAs, ({ $params: [_, otherName = 'other'] }) =>
    t('regle.rules.sameAs', { otherName }),
  )
}
