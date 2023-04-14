import {useLoginUser} from './use_login_user';
import {useLocale} from "~/composables/use_locale";
import { required } from "~/utils/i18n-validators";
import {useVuelidate} from "@vuelidate/core";

export interface Comment {
  id: number | null
  frame_id: number | null | undefined
  body: string
  user_id: number | null
  user_name: string
  user_image_url: string
  updated_at: string | null
}

export function useComment() {
  const comment: Comment = reactive<Comment>({
    id: null,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    updated_at: null
  });

  const comments: Comment[] = reactive<Comment[]>([]);

  const error_messages = reactive({
    body: [],
    base: []
  })

  const nuxtApp = useNuxtApp()
  const { backendApiURL } = useConstants()

  const rules = {
    body: { required }
  }

  const cv$ = useVuelidate(rules, comment)

  const { locale } = useLocale()
  const { login_user, navigateLogoutTo } = useLoginUser()

  const getComments = async () => {
    //console.log(comment.frame_id);
    const { data } = await useAsyncData('get_comments', () =>
      $fetch(`${backendApiURL}/frames/${comment.frame_id}/comments`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data: any = data.value
    //console.log(json_data)

    if (json_data && json_data.data) {
      const comment_list = json_data.data;
      //console.log(comment_list);
      comments.splice(0, comments.length);
      for (let comment of comment_list) {
        //console.log(comment);
        comments.push(createCommentFromJson(comment));
      }
      //console.log(comments);
    }
  };

  const createCommentFromJson = (row_data: any): Comment =>{
    return {
      id: row_data.id,
      frame_id: row_data.attributes.frame_id,
      body: row_data.attributes.body,
      user_id: row_data.attributes.user_id,
      user_name: row_data.attributes.user_name,
      user_image_url: row_data.attributes.user_image_url,
      updated_at: row_data.attributes.updated_at
    }
  }

  const postComment = async () => {
    const postData = {
      comment: {
        frame_id: comment.frame_id,
        body: comment.body
      }
    }

    const {data, error} = await useAsyncData('post_comment', () =>
      $fetch(`/api/frames/${comment.frame_id}/comments`,
        {
          method: 'post',
          body: postData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language' : locale.value,
            Authorization: `Bearer ${login_user.value.token}`
          }
        }
      )
    )

    const json_data: any = data.value

    if (json_data && json_data.data) {
      comment.body = '';
      cv$.value.$reset()
    }else if(json_data && json_data.errors){
      const errors = json_data.errors

      setErrorMessages(errors)
    } else if (error.value) {
      clearErrorMessages()
      // @ts-ignore
      // error_messages.base= [nuxtApp.$i18n.t('action.comment.login')];
      navigateLogoutTo('/')
    }
  }

  const createComment = async () => {
    // @ts-ignore
    i18n.global.locale.value = locale.value
    const result = await cv$.value.$validate();

    //console.log(cv$.value.body.$invalid)
    //console.log(cv$.value.$invalid)
    //console.log(cv$.value.$error)
    //console.log(cv$.value.$errors)
    //console.log(comment.body)

    if (!cv$.value.body.$invalid) {
      //console.log(comment.userId);
      //console.log(comment.frameId);
      //console.log(comment.body);
      await postComment();

      if(isSuccess()){
        comments.splice(0, comments.length);
        await getComments()
      }
    }
  };

  const setErrorMessages = (errors: any) => {
    if(errors.body){
      error_messages.body = errors.body
    } else {
      error_messages.body = []
    }
  }

  const clearErrorMessages = () => {
    error_messages.body = []
    error_messages.base = []
  }

  const isSuccess = () => {
    let result: boolean = true

    if(error_messages.body.length > 0){
      result = false
    }

    return result
  }

  const deleteComment = async (comment: any) => {
    const {data, error} = await useAsyncData('delete_comment', () =>
      $fetch(`/api/comments/${comment.id}`,
        {
          method: 'delete',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language' : locale.value,
            Authorization: `Bearer ${login_user.value.token}`
          }
        }
      )
    )

    clearErrorMessages();

    if (error.value) {
      // @ts-ignore
      // error_messages.base = [nuxtApp.$i18n.t('action.comment.login')];
      navigateLogoutTo('/')
    }

    if(isSuccess()){
      comments.splice(0, comments.length);
      await getComments()
    }
  };

  return {
    comment, comments, error_messages ,getComments, cv$, createComment, deleteComment
  }
}