import Bowser from 'bowser'

export const useUserAgent = function () {
  const parser = Bowser.getParser(globalThis.navigator.userAgent)
  const userAgent = parser.getResult()

  const browser = userAgent.browser
  const engine = userAgent.engine
  const os = userAgent.os
  const platform = userAgent.platform

  return { browser, engine, os, platform, parser }
}
