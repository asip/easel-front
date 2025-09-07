import {  createRule } from '@regle/core'
import type { Maybe } from '@regle/core';
import { isFilled } from '@regle/rules'

export const maxBlobSize = createRule({
  type: 'maxBlobSize',
  validator: (value: Maybe<Blob>, max: number) =>{
    return !isFilled(value) || value.size <= max * 1000 * 1000
  },
  message: ({ $params: [max] }) => `are limited to ${max} MB.`
})
