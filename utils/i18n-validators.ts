import * as validators from "@vuelidate/validators";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "ja", // set locale
  fallbackLocale: "ja", // set fallback locale
  messages: {
    ja: {
      message: {
        hello: "こんにちは、世界",
      },
      validations: {
        required: "必須です。",
        email: "正しいメールアドレスの形式で入力してください。",
        minLength: "{min}文字以上です。",
        maxLength: "{max}文字までです。",
        tagArrayLength: "５つまでです。",
        tagLength: "10文字までです。"
      },
    },
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

export let tagArrayLength = (size: number) => validators.helpers.withParams(
  { type: 'tagLength', value: size },
  (value) => {
    return !validators.helpers.req(value) || value.length <= size
  }
)

tagArrayLength = withI18nMessage(tagArrayLength, {
  withArguments: true,
})

export let tagLength = (size: number) => validators.helpers.withParams(
  { type: 'tagLength', value: size },
  (value) => {
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
