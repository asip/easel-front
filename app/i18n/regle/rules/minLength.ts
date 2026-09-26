import * as r from '@regle/rules'

export const minLength = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(r.minLength, ({ $params: [min] }) => t('regle.rules.minLength', { min }))
}
