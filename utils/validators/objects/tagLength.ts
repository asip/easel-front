import tagLength from '../raw/tagLength'

export default function (size: number) {
  return {
    $validator: tagLength(size),
    $message: ({ $params }: { $params: { size: number } }) => `are limited to ${$params.size} characters.`,
    $params: { size, type: 'tagLength' }
  }
}
