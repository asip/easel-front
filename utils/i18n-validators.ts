import * as validators from "@vuelidate/validators";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages: {
    en: {
      validations: {
        required: "Required.",
        tagArrayLength: "are limited to 5.",
        email: "is invalid format.",
        minLength: "More than {min} characters.",
        maxLength: "are limited to {max} characters.",
        sameAs: "Passwords don't match.",
        tagLength: "are limited to 10 characters."
      }
    },
    ja: {
      validations: {
        required: "必須です。",
        email: "正しいメールアドレスの形式で入力してください。",
        minLength: "{min}文字以上です。",
        maxLength: "{max}文字までです。",
        tagArrayLength: "５つまでです。",
        sameAs: "パスワードとパスワード(確認)の入力が一致しません。",
        tagLength: "10文字までです。"
      },
    }
  },
});

const { createI18nMessage, helpers } = validators;

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });

export const required = withI18nMessage(validators.required);

export const email = withI18nMessage(validators.email);

export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true,
});

export const maxLength = withI18nMessage(validators.maxLength, {
  withArguments: true,
});

export const sameAs = withI18nMessage(validators.sameAs, {
  withArguments: true,
})

export let tagArrayLength = (size: number) => validators.helpers.withParams(
  { type: 'tagLength', value: size },
  (value: string) => {
    return !validators.helpers.req(value) || value.length <= size
  }
)

tagArrayLength = withI18nMessage(tagArrayLength, {
  withArguments: true,
})

export let tagLength = (size: number) => validators.helpers.withParams(
  { type: 'tagLength', value: size },
  (value: string[]) => {
    let res = true
    value.forEach((tag) => {
      let res_row = tag.length > size
      if (res_row){ res = false }
    })
    return !validators.helpers.req(value) || res
  }
)

tagLength = withI18nMessage(tagLength, {
  withArguments: true,
})
