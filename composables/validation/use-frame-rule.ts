const frame_rule = {
  name: { required, minLength: minLength(1), maxLength: maxLength(20) },
  tags: { tagArrayLength: tagArrayLength(5), tagLength: tagLength(10) }
}

export function useFrameRule () {
  return frame_rule
}
