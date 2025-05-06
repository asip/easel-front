import { type Maybe ,createRule } from '@regle/core'
import { isFilled } from '@regle/rules'

export const tagLength = createRule({
  type: 'tagLength',
  validator: (value: Maybe<string[]>, size: number) =>{
      let res = true
      if(value){
        value.forEach((tag) => {
          const resRow = tag.length > size
          if (resRow) { res = false }
        })
      }
      return !isFilled(value) || res
  },
  message: ({ $params: [size] }) => `are limited to ${size} characters.`
})