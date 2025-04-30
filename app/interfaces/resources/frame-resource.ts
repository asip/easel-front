export interface FrameResource {
  id: number | undefined
  user_id: number | null | undefined
  user_name: string
  name: string
  tag_list: string
  tags: string[]
  comment: string
  shooted_at: string
  shooted_at_html: string | null | undefined
  file: Blob | undefined | null,
  file_url: string | null | undefined
  file_two_url: string | undefined
  file_three_url: string | undefined
  private: boolean
  updated_at: string
}