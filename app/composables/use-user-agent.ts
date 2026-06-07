import Bowser from 'bowser'

export const useUserAgent = function () {
  const userAgent = Bowser.parse(globalThis.navigator.userAgent)
  const browser = Bowser.getParser(globalThis.navigator.userAgent)

  return { userAgent, browser }
}
