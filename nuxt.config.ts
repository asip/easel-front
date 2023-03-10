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
              model_name: '??????????????????',
              name: '???????????????',
              image: '????????????',
              email: 'E????????? ',
              password: '???????????????',
              password_confirmation: '???????????????(??????)'
            },
            frame: {
              model_name: '',
              name: '??????',
              file: '????????????',
              tag_list: '??????',
              shooted_at: '????????????',
              comment: '????????????'
            },
            comment: {
              model_name: '????????????'
            }
          },
          component: {
            tag_search: {
              placeholder: '?????? or ?????? or ??????/?????????',
              search: '??????'
            }
          },
          action: {
            model: {
              create: '??????',
              update: '??????',
              delete: '??????',
              return: '??????'
            },
            user: {
              login: '????????????',
              new: '??????????????????',
              follow: '??????????????????',
              unfollow: '?????????????????????'
            },
            frame: {
              upload: '??????????????????'
            },
            comment: {
              post: '??????',
              required: '???????????????????????????????????????',
              login: '??????????????????????????????'
            },
            modal: {
              close: '?????????',
              delete: {
                message: '???????????????????????????????????????'
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
