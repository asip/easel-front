import type { Ref } from 'vue'
import { useLoginUser } from './use_login_user'
import { useGetApi } from './api/use_get_api'
import { usePostApi } from './api/use_post_api'
import { useDeleteApi } from './api/use_delete_api'

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
    const { error, statusCode } = await usePostApi({
      key: 'follow',
      url: `${backendApiURL.value}/users/${userId}/follow_relationships`,
      token: login_user.value.token
    })

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
    // let statusCode!: number

    const { error, statusCode } = await useDeleteApi({
      key: 'unfollow',
      url: `${backendApiURL.value}/users/${userId}/follow_relationships`,
      token: login_user.value.token
    })

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
