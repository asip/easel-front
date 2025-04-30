export interface CommentResource {
  id: number
  frame_id: number | null | undefined
  body: string
  user_id: number | null
  user_name: string
  user_image_url: string
  updated_at: string | null
}