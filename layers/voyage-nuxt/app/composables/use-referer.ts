import { useState } from 'nuxt/app'

export function useReferer() {
  const referers = useState<Record<string, string>>('referers', () => {
    return {}
  })

  return { referers }
}
