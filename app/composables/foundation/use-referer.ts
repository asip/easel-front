export function useReferer() {
  const referers = useState<Record<string, string>>('referers', () => {
    return {}
  })

  return { referers }
}