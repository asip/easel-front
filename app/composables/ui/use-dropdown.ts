export const useDropdown = function (el: Ref<HTMLDetailsElement | null>) {
  const closeDropdown = (): void => {
    if (el.value) el.value.open = false
  }

  return { closeDropdown }
}
