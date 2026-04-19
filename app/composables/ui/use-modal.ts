export const useModal = function () {
  const modals: Partial<Record<string, HTMLDialogElement>> = {}

  const getModal = (selector: string): HTMLDialogElement | null => {
    const modalEl: HTMLDialogElement | null = modals[selector] ?? document.querySelector(selector)
    if (modalEl && !modals[selector]) modals[selector] = modalEl
    return modalEl
  }

  const openModal = (selector: string): void => {
    const modalEl: HTMLDialogElement | null = getModal(selector)
    modalEl?.showModal()
  }

  const closeModal = (selector: string): void => {
    const modalEl: HTMLDialogElement | null = getModal(selector)
    modalEl?.close()
  }

  const checkOutside = (
    e: PointerEvent,
    selector: string,
  ): {
    modalEl: HTMLDialogElement | null
    isOutside: boolean
  } => {
    const modalEl: HTMLDialogElement | null = getModal(selector)
    const modalBoxEl: HTMLDivElement | null | undefined = modalEl?.querySelector('.modal-box')
    const rect = modalBoxEl?.getBoundingClientRect()
    const isOutside = rect
      ? e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      : true
    return { modalEl, isOutside }
  }

  return { openModal, closeModal, checkOutside }
}
