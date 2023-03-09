// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr:true,
  app: {
    head: {
      title: "Easel",
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
      ],
      link: [
        { href: "/palette.svg", type: "image/svg+xml", rel: "icon" },
        { href: "/palette.svg", type: "image/svg+xml", rel: "mask-icon", color: "#000000" }
      ],
      script: [
        { src: 'https://apis.google.com/js/api.js' },
        { src: 'https://accounts.google.com/gsi/client' }
      ]
    }
  },
  css: [
    "~/assets/styles/main.scss",
    "bootstrap-icons/font/bootstrap-icons.css"
  ],
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/i18n'
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieCrossOrigin: true,
      redirectOn: 'root',  // recommended
    },
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    vueI18n: {
      messages: {
        en: {
          model:  {
            user: {
              model_name: 'Profile',
              name: 'User Name',
              image: 'Icon',
              email: 'E-mail',
              password: 'Password',
              password_confirmation: 'Password (confirmation)'
            },
            frame: {
              model_name: '',
              name: 'Name',
              file: 'File',
              tag_list: 'Tags',
              shooted_at: 'Shooting Date',
              comment: 'Comment'
            },
            comment: {
              model_name: 'Comment'
            }
          },
          component: {
            tag_search: {
              placeholder: 'Tag or Name or Date',
              search: 'Search'
            }
          },
          action: {
            model: {
              create: 'Regist',
              update: 'Edit',
              delete: 'Delete',
              return: 'Return'
            },
            user: {
              login: 'Login',
              new: 'User Registration',
              follow: 'Follow',
              unfollow: 'Now following'
            },
            frame: {
              upload: 'Upload'
            },
            comment: {
              post: 'Post',
              required: 'Required.',
              login: 'Please login.'
            },
            modal: {
              close: 'Close',
              delete: {
                message: 'Are you sure you want to delete it?'
              }
            }
          }
        },
        ja: {
          model: {
            user: {
              model_name: 'プロフィール',
              name: 'ユーザー名',
              image: 'アイコン',
              email: 'Eメール ',
              password: 'パスワード',
              password_confirmation: 'パスワード(確認)'
            },
            frame: {
              model_name: '',
              name: '名前',
              file: 'ファイル',
              tag_list: 'タグ',
              shooted_at: '撮影日時',
              comment: 'コメント'
            },
            comment: {
              model_name: 'コメント'
            }
          },
          component: {
            tag_search: {
              placeholder: 'タグ or 名前 or 撮影/更新日',
              search: '検索'
            }
          },
          action: {
            model: {
              create: '登録',
              update: '編集',
              delete: '削除',
              return: '戻る'
            },
            user: {
              login: 'ログイン',
              new: 'ユーザー登録',
              follow: 'フォローする',
              unfollow: 'フォローを外す'
            },
            frame: {
              upload: 'アップロード'
            },
            comment: {
              post: '投稿',
              required: 'コメントを入力してください',
              login: 'ログインしてください'
            },
            modal: {
              close: '閉じる',
              delete: {
                message: '削除してもよろしいですか？'
              }
            }
          }
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3000',
      baseApiURL: 'http://localhost:3000/api/v1',
      googleClientId: ''
    }
  }
})
