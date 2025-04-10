import { type Maybe ,createRule } from '@regle/core'
import { isFilled } from '@regle/rules'

export const tagLength = createRule({
  type: 'tagLength',
  validator: (value: Maybe<string[]>, size: number) =>{
      let res = true
      if(value){
        value.forEach((tag) => {
          const res_row = tag.length > size
          if (res_row) { res = false }
        })
      }
      return !isFilled(value) || res
  },
  message: ({ $params: [size] }) => `are limited to ${size} characters.`
})