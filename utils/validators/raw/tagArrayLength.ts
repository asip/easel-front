import { helpers } from '@vuelidate/validators'

export default function(size: number) {
  return (value: string[]) => {
    return !helpers.req(value) || value.length <= size
  }
}
