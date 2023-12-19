import type { Ref } from 'vue'
import { useLoginUser } from './use_login_user'
import { useGetApi } from './api/use_get_api'

export function useFollow () {
  const following: Ref<Boolean> = ref<Boolean>(false)

  const { $i18n } = useNuxtApp()

  const { backendApiURL } = useConstants()

  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const isFollowing = async (userId: string) => {
    const { data, error, statusCode } = await useGetApi({
      key: 'is_following',
      url: `${backendApiURL.value}/profile/following/${userId}`,
      token: login_user.value.token
    })

    // clearFlash()

    if (error.value) {
      switch (statusCode) {
        case 401:
          // flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        // default:
        //  flash.value.alert = error.value.message
      }
    } else if (data.value) {
      const { following: followingValue } = data.value as any

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
          flash.value.alert = $i18n.t('action.error.login')
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
          flash.value.alert = $i18n.t('action.error.login')
          clearLoginUser()
          break
        default:
          flash.value.alert = error.value.message
      }
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing, flash
  }
}
