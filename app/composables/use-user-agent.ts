import Bowser from 'bowser'

export const useUserAgent = function (options?: { parse: boolean }) {
  const parse = options?.parse ?? true

  const parser = Bowser.getParser(globalThis.navigator.userAgent)

  let browser = null
  let engine = null
  let os = null
  let platform = null

  if (parse) {
    const userAgent = parser.getResult()
    browser = userAgent.browser
    engine = userAgent.engine
    os = userAgent.os
    platform = userAgent.platform
  }

  return { browser, engine, os, platform, parser }
}
