import * as r from '@regle/rules'

export const maxFileSize = () => {
  const { $i18n } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = $i18n as any
  return r.withMessage(r.maxFileSize, ({ $params: [maxSize] }) =>
    t('regle.rules.maxFileSize', { max: maxSize / (1000 * 1000) }),
  )
}
