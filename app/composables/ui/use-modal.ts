export const useModal = function () {
  const modals: Partial<Record<string, HTMLDialogElement>> = {}

  const openModal = (selector: string): void => {
    const modalEl: HTMLDialogElement | null = modals[selector] ?? document.querySelector(selector)
    if (modalEl && !modals[selector]) modals[selector] = modalEl
    modalEl?.showModal()
  }

  const closeModal = (selector: string): void => {
    const modalEl: HTMLDialogElement | null = modals[selector] ?? document.querySelector(selector)
    if (modalEl && !modals[selector]) modals[selector] = modalEl
    modalEl?.close()
  }

  const checkOutside = (
    e: PointerEvent,
    selector: string,
  ): {
    modalEl: HTMLDialogElement | null
    isOutside: boolean
  } => {
    const modalEl: HTMLDialogElement | null = modals[selector] ?? document.querySelector(selector)
    if (modalEl && !modals[selector]) modals[selector] = modalEl
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
