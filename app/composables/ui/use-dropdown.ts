type useDropdownOptions = { key: string }

export function useDropdown ({ key }: useDropdownOptions) {
  const dropdownRef: Ref = useTemplateRef(key)

  const closeDropdown = (): void => {
    const dropdown: HTMLDetailsElement = dropdownRef.value
    dropdown.open = false
  }

  return { closeDropdown }
}