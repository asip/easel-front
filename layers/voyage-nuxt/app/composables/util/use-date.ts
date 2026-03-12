export function useDate() {
  const isValidDate = (str: string): boolean => {
    return !!str && !!str.match(/\d{4}\/\d{2}\/\d{2}/) && !isNaN(Date.parse(str))
  }

  return { isValidDate }
}
