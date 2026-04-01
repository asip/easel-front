import type { PaginationQuery } from './pagination-query'
import type { FrameCriteria } from './frame-criteria'

export interface FrameQuery extends PaginationQuery {
  items: FrameCriteria
}
