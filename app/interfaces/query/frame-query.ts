export interface FrameQuery {
  items: {
    word?: string | null
    frame_name?: string | null
    tag_name?: string | null
    user_name?: string | null
    creator_name?: string | null
    date?: string | null
  },
  page: number | null
  pages: number
  total: number
}