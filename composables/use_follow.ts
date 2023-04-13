import { useLoginUser } from './use_login_user';
import { Ref } from "vue";

export function useFollow() {
  const following: Ref<Boolean> = ref<Boolean>(false)

  const { baseApiURL } = useConstants()
  const { login_user, navigateLogoutTo } = useLoginUser()
  const isFollowing = async (userId: string) => {
    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${baseApiURL}/profile/following/${userId}`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    const json_data: any = data.value

    if(json_data){
      following.value = json_data.following
    } else if (error.value){
      navigateLogoutTo('/')
    }
  }

  const follow = async (userId: number | null) => {
    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${baseApiURL}/users/${userId}/follow_relationships`, {
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    if (error.value){
      navigateLogoutTo('/')
    }

    following.value = true
  }

  const unfollow = async (userId: number | null) => {
    const { data, error } = await useAsyncData('getFrame', () =>
      $fetch(`${baseApiURL}/users/${userId}/follow_relationships`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    if (error.value){
      navigateLogoutTo('/')
    }

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing
  }
}