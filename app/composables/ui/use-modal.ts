export function useModal () {
  const openModal = (selector :string): void => {
    const modalEl: HTMLDialogElement | null = document.querySelector(selector)
    if (modalEl) {
      modalEl.showModal()
    }
  }

  const closeModal = (selector :string): void => {
    const modalEl: HTMLDialogElement | null = document.querySelector(selector)
    if (modalEl) {
      modalEl.close()
    }
  }

  return { openModal, closeModal }
}
