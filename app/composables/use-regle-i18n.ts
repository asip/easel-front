import { defineRegleConfig } from '@regle/core'
import type { Composer } from 'vue-i18n'

import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  maxFileSize,
  maxTagArrayLength,
  maxTagLength,
} from '~/i18n/regle/rules'

export const { useRegle: useRegleI18n } = defineRegleConfig({
  rules: () => {
    const { $i18n } = useNuxtApp()
    const i18n = $i18n as Composer

    return {
      required: required(i18n),
      minLength: minLength(i18n),
      maxLength: maxLength(i18n),
      email: email(i18n),
      sameAs: sameAs(i18n),
      maxFileSize: maxFileSize(i18n),
      maxTagArrayLength: maxTagArrayLength(i18n),
      maxTagLength: maxTagLength(i18n),
    }
  },
})
