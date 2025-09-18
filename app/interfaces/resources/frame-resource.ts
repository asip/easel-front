export interface FrameResource {
  id: number | undefined
  user_id: number | null | undefined
  user_name: string
  name: string
  tag_list: string
  tags: string[]
  comment: string
  creator_name: string
  shooted_at: string
  file: Blob | undefined | null,
  file_url: string | null | undefined
  file_two_url: string | undefined
  file_three_url: string | undefined
  private: boolean
  created_at: string
  updated_at: string | null
}