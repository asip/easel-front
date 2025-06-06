export function useDropdown (refKey: string) {
  const dropdownRef: Ref = useTemplateRef(refKey)

  const closeDropdown = () => {
    const dropdown: HTMLDetailsElement = dropdownRef.value
    dropdown.open = false
  }

  return { closeDropdown }
}