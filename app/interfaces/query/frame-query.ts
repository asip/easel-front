export interface FrameQuery {
  items: {
    word?: string | null
  },
  page: number | null
  pages: number
  total: number
}