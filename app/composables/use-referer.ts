export const useReferer = () => {
  const referers = useRecordStore('referers')

  return { referers }
}
