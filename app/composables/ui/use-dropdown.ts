type useDropdownOptions = { el: Ref<HTMLDetailsElement | null> }

export const useDropdown = function ({ el }: useDropdownOptions) {
  const closeDropdown = (): void => {
    if (el.value) el.value.open = false
  }

  return { closeDropdown }
}
