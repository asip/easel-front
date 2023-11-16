import type { Ref } from 'vue'
import { useLoginUser } from './use_login_user'

export function useFollow () {
  const following: Ref<Boolean> = ref<Boolean>(false)

  const nuxtApp = useNuxtApp()

  const { backendApiURL } = useConstants()

  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const isFollowing = async (userId: string) => {
    let statusCode!: number

    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${backendApiURL.value}/profile/following/${userId}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    // clearFlash()

    const json_data = data.value as any

    if (error.value) {
      switch (statusCode) {
        case 401:
          // flash.value.alert = nuxtApp.$i18n.t('action.comment.login')
          clearLoginUser()
          break
        // default:
        //  flash.value.alert = error.value.message
      }
    } else if (json_data) {
      const { following: followingValue } = json_data

      if (followingValue != null || followingValue !== undefined) {
        following.value = followingValue
      }
    }
  }

  const follow = async (userId: number | null) => {
    let statusCode!: number

    const { error } = await useAsyncData('follow', () =>
      $fetch(`${backendApiURL.value}/users/${userId}/follow_relationships`, {
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = nuxtApp.$i18n.t('action.comment.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    following.value = true
  }

  const unfollow = async (userId: number | null) => {
    let statusCode!: number

    const { error } = await useAsyncData('unfollow', () =>
      $fetch(`${backendApiURL.value}/users/${userId}/follow_relationships`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        },
        async onResponse ({ response }) {
          statusCode = response.status
        }
      })
    )

    clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 401:
          flash.value.alert = nuxtApp.$i18n.t('action.comment.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing
  }
}
