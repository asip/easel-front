import * as r from '@regle/rules'

export const sameAs = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(r.sameAs, ({ $params: [_, otherName = 'other'] }) =>
    t('regle.rules.sameAs', { otherName }),
  )
}
