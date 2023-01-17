export const useWordSearch = () => {
  const word = useState<string>('word', () => {
    return ''
  })

  return {
    word
  }
}