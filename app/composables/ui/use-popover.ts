export const usePopover = function () {
  const popovers: Partial<Record<string, HTMLDivElement>> = {}

  const getPopover = (selector: string): HTMLDivElement | null => {
    const popoverEl: HTMLDivElement | null = popovers[selector] ?? document.querySelector(selector)
    if (popoverEl && !popovers[selector]) popovers[selector] = popoverEl
    return popoverEl
  }

  const openPopover = (selector: string): void => {
    const popoverEl: HTMLDivElement | null = getPopover(selector)
    popoverEl?.showPopover()
  }

  const closePopover = (selector: string): void => {
    const popoverEl: HTMLDivElement | null = getPopover(selector)
    popoverEl?.hidePopover()
  }

  const available = computed(() => {
    const { userAgent } = useUserAgent()
    const browserName = userAgent.browser.name
    const browserVersion = parseFloat(userAgent.browser.version ?? '0')
    return (
      (browserName == 'Safari' && browserVersion >= 26.2) ||
      ((browserName == 'Chrome' || browserName == 'Edge') && browserVersion >= 135) ||
      (browserName == 'Firefox' && browserVersion >= 144)
    )
  })

  return { openPopover, closePopover, available }
}
