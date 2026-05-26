export const useModal = function (boxSelector: string = '.modal-box') {
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

  const isOutside = (ev: PointerEvent, selector: string): boolean => {
    const modalEl: HTMLDialogElement | null = getModal(selector)
    const modalBoxEl: HTMLDivElement | null | undefined = modalEl?.querySelector(boxSelector)
    const rect = modalBoxEl?.getBoundingClientRect()
    const isOutside = rect
      ? ev.clientX < rect.left ||
        ev.clientX > rect.right ||
        ev.clientY < rect.top ||
        ev.clientY > rect.bottom
      : true
    return isOutside
  }

  return { openModal, closeModal, isOutside }
}
