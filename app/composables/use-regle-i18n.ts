import { defineRegleConfig } from '@regle/core'

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
  rules: () => ({
    required: required(),
    minLength: minLength(),
    maxLength: maxLength(),
    email: email(),
    sameAs: sameAs(),
    maxFileSize: maxFileSize(),
    maxTagArrayLength: maxTagArrayLength(),
    maxTagLength: maxTagLength(),
  }),
})
