import type { PaginationQuery } from "./pagination-query";

export interface UserFrameQuery extends PaginationQuery {
  user_id: string | null
}
