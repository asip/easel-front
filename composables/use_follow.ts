import { useLoginUser } from './use_login_user';
import { Ref } from "vue";

export function useFollow() {
  const following: Ref<Boolean> = ref<Boolean>(false)

  const { baseApiURL } = useConstants()
  const { login_user } = useLoginUser()
  const isFollowing = async (userId: string) => {
    const { data } = await useAsyncData('getFrame', () =>
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
    }
  }

  const follow = async (userId: number | null) => {
    const { data } = await useAsyncData('getFrame', () =>
      $fetch(`${baseApiURL}/users/${userId}/follow_relationships`, {
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    following.value = true
  }

  const unfollow = async (userId: number | null) => {
    const { data } = await useAsyncData('getFrame', () =>
      $fetch(`${baseApiURL}/users/${userId}/follow_relationships`, {
        method: 'delete',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${login_user.value.token}`
        }
      })
    )

    following.value = false
  }

  return {
    following, follow, unfollow, isFollowing
  }
}