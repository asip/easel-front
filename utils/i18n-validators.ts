import * as validators from '@vuelidate/validators'
import { createI18n } from 'vue-i18n'
import { tagLength as tagLength_, tagArrayLength as tagArrayLength_ } from './validators/index'

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      validations: {
        required: 'Required.',
        email: 'is invalid format.',
        minLength: 'More than {min} characters.',
        maxLength: 'are limited to {max} characters.',
        sameAs: "Passwords don't match.",
        tagArrayLength: 'are limited to {size}.',
        tagLength: 'are limited to {size} characters.'
      }
    },
    ja: {
      validations: {
        required: '必須です。',
        email: '正しいメールアドレスの形式で入力してください。',
        minLength: '{min}文字以上です。',
        maxLength: '{max}文字までです。',
        sameAs: 'パスワードとパスワード(確認)の入力が一致しません。',
        tagArrayLength: '{size}つまでです。',
        tagLength: '{size}文字までです。'
      }
    }
  }
})

const { createI18nMessage } = validators

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

export const required = withI18nMessage(validators.required)

export const email = withI18nMessage(validators.email)

export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true
})

export const maxLength = withI18nMessage(validators.maxLength, {
  withArguments: true
})

export const sameAs = withI18nMessage(validators.sameAs, {
  withArguments: true
})

export const tagArrayLength = withI18nMessage(tagArrayLength_, {
  withArguments: true
})

export const tagLength = withI18nMessage(tagLength_, {
  withArguments: true
})
