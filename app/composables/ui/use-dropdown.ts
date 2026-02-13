type useDropdownOptions = { el: Ref<HTMLDetailsElement | null> }

export function useDropdown({ el }: useDropdownOptions) {
  const closeDropdown = (): void => {
    if (el.value) el.value.open = false
  }

  return { closeDropdown }
}
