export function useModal () {
  const removeBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop')
    backdrop?.remove()
  }

  return { removeBackdrop }
}
