import * as r from '@regle/rules'

export const maxLength = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(r.maxLength, ({ $params: [max] }) => t('regle.rules.maxLength', { max }))
}
