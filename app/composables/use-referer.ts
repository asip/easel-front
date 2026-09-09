export const useReferer = () => {
  const { record: referers } = useRecordStore('referers')

  return { referers }
}
