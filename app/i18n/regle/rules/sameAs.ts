import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const sameAs = () => {
  const { $i18n } = useNuxtApp()
  const { t } = $i18n as Composer

  return r.withMessage(r.sameAs, ({ $params: [_, otherName = 'other'] }) =>
    t('regle.rules.sameAs', { otherName }),
  )
}
