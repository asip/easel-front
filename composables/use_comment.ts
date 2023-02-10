import { useLoginUser } from './use_login_user';

export interface Comment {
  id: number | null
  frame_id: number | null | undefined,
  body: string
  user_id: number | null,
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

  const error_messages: string[] = reactive<string[]>([]);

  const { baseApiURL } = useConstants()
  const { login_user } = useLoginUser()

  const getComments = async () => {
    //console.log(comment.frame_id);
    const { data } = await useAsyncData('get_comments', () =>
      $fetch(`${baseApiURL}/frames/${comment.frame_id}/comments`, {
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
    const comment: Comment = {
      id: row_data.id,
      frame_id: row_data.attributes.frame_id,
      body: row_data.attributes.body,
      user_id: row_data.attributes.user_id,
      user_name: row_data.attributes.user_name,
      user_image_url: row_data.attributes.user_image_url,
      updated_at: row_data.attributes.updated_at
    }

    return comment
  }

  const setComment = (comment_: Comment | undefined) => {
    if(comment_){
      comment.frame_id = comment_.frame_id
      comment.body = comment_.body
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