import type { Ref } from 'vue'
import { useLoginUser } from './use_login_user'
import { useGetApi } from './api/use_get_api'
import { usePostApi } from './api/use_post_api'
import { useDeleteApi } from './api/use_delete_api'

export function useFollow () {
  const following: Ref<Boolean> = ref<Boolean>(false)

  const { $i18n } = useNuxtApp()

  const { login_user, clearLoginUser } = useLoginUser()
  const { flash, clearFlash } = useFlash()

  const isFollowing = async (userId: string) => {
    const { data, error } = await useGetApi({
      url: `/profile/following/${userId}`,
      token: login_user.value.token
    })

    // clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
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
    const { error } = await usePostApi({
      url: `/users/${userId}/follow_relationships`,
      token: login_user.value.token
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
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
    const { error } = await useDeleteApi({
      url: `/users/${userId}/follow_relationships`,
      token: login_user.value.token
    })

    clearFlash()

    if (error.value) {
      switch (error.value.statusCode) {
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
