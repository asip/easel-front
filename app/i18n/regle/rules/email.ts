import * as r from '@regle/rules'

export const email = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(r.email, () => t('regle.rules.email'))
}
