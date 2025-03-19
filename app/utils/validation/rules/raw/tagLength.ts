import { helpers } from '@vuelidate/validators'

export default function (size: number) {
  return (value: string[]) => {
    let res = true
    value.forEach((tag) => {
      const res_row = tag.length > size
      if (res_row) { res = false }
    })
    return !helpers.req(value) || res
  }
}
