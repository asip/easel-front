export function useModal () {
  const { $bootstrap } = useNuxtApp()

  const removeBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop')
    backdrop?.remove()
  }

  const closeModal = (selector :string) => {
    const modalEl: HTMLDivElement | null = document.querySelector(selector)
    if (modalEl) {
      // @ts-ignore
      const modal = $bootstrap.Modal.getInstance(modalEl)
      modal.hide()
    }
  }

  return { removeBackdrop, closeModal }
}
