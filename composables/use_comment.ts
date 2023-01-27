import { Body } from './../.nuxt/components.d';
import { useLoginUser } from './use_login_user';
import  { User } from '~/composables/use_login_user'

export interface Comment {
  frame_id: string,
  body: string
}

export function useComment() {
  const comment: any = reactive<Comment>({
    frame_id: '',
    body: '',
  });

  const comments: any[] = reactive<any[]>([]);

  const error_messages: any = reactive<string[]>([]);

  const { login_user } = useLoginUser()

  const getComments = async () => {
    //console.log(frame_id);
    const { data } = await useAsyncData('get_comments', () =>
      $fetch(`/api/frames/${comment.frame_id}/comments`, {
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    )

    const json_data: any = data.value
    //console.log(json_data)

    if (json_data.data) {
      const comment_list = json_data.data;
      //console.log(comment_list);
      comments.splice(0, comments.length);
      for (let comment of comment_list) {
        //console.log(comment);
        comments.push(comment);
      }
      //console.log(comments);
    }
  };

  const setComment = (_comment: Comment | undefined) => {
    if(_comment){
      comment.frame_id = _comment.frame_id
      comment.body = _comment.body
    }
  }

  const postComment = async () => {
    try {
      const postData = {
        comment: {
          frame_id: comment.frame_id,
          body: comment.body
        }
      }

      const { data } = await useAsyncData('post_comment', () =>
        $fetch(`/api/frames/${comment.frame_id}/comments`,
          {
            method: 'post',
            body: postData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              Authorization: `Bearer ${login_user.value.token}`
            }
          }
        )
      )

      const json_data: any = data.value

      if(json_data.data) {
        const error_message_list = json_data.data.attributes.error_messages
        if ( error_message_list && error_message_list.length > 0) {
          error_messages.splice(0, error_messages.length);
          for (let error_message of error_message_list) {
            error_messages.push(error_message)
          }
        } else {
          comment.body = '';
        }
      }
    } catch (error) {
      error_messages.splice(0, error_messages.length);
      error_messages.push('ログインしてください。');
    }
  }

  const createComment = async () => {
    if (comment.body != '') {
      //console.log(comment.userId);
      //console.log(comment.frameId);
      //console.log(comment.body);
      await postComment();
      error_messages.splice(0, error_messages.length);
    } else {
      error_messages.splice(0, error_messages.length);
      error_messages.push('コメントを入力してください。');
    }
  };
  const deleteComment = async (comment: any) => {
    try {
      const { data } = await useAsyncData('delete_comment', () =>
        $fetch(`/api/comments/${comment.id}`,
          {
            method: 'delete',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              Authorization: `Bearer ${login_user.value.token}`
            }
          }
        )
      )
      error_messages.splice(0, error_messages.length);
    } catch (error) {
      error_messages.splice(0, error_messages.length);
      error_messages.push('ログインしてください。');
    }
  };

  return {
    comment, comments, error_messages ,getComments, setComment, createComment, deleteComment
  }
}