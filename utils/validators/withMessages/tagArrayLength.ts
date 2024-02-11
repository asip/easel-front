import tagArrayLength from "../raw/tagArrayLength"

export default function(size: number){
  return {
    $validator: tagArrayLength(size),
    $message: ({ $params }: { $params: any }) => `are limited to ${$params.size}.`,
    $params: { size, type: 'tagArrayLength' }
  }
}
