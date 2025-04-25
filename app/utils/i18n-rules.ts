import { createI18n } from 'vue-i18n'

export { tagArrayLength, tagLength } from './validation'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      rules: {
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
      rules: {
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

export { i18n }
