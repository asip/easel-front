import * as r from '@regle/rules'

export const required = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(r.required, () => t('regle.rules.required'))
}
