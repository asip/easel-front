import {  createRule } from '@regle/core'
import type { Maybe } from '@regle/core';
import { isFilled } from '@regle/rules'

export const maxTagArrayLength = createRule({
  type: 'maxTagArrayLength',
  validator: (value: Maybe<string[]>, size: number) => {
    return !isFilled(value) || value.length <= size
  },
  message: ({ $params: [size] }) => `are limited to ${size}.`
})
