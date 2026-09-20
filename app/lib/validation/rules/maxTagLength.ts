import { createRule } from '@regle/core'
import type { Maybe } from '@regle/core'
import { isFilled } from '@regle/rules'

export const maxTagLength = createRule({
  type: 'maxTagLength',
  validator: (value: Maybe<string[]>, size: number) => {
    let res = true
    if (value) {
      value.forEach((tag) => {
        if (tag.length > size) {
          res = false
        }
      })
    }
    return !isFilled(value) || res
  },
  message: ({ $params: [size] }) => `are limited to ${size} characters.`,
})
