const COOKIE_CONSENT_KEY = 'tre_cookie_consent'
const COOKIE_CONSENT_EVENT = 'tre-cookie-consent-changed'

let memoryConsent = null

const isStorageAvailable = () => {
  try {
    const testKey = '__tre_cookie_test__'
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

const readConsent = () => {
  if (typeof window === 'undefined') return memoryConsent

  if (isStorageAvailable()) {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY)
  }

  return memoryConsent
}

const writeConsent = (value) => {
  memoryConsent = value

  if (typeof window === 'undefined') return

  if (isStorageAvailable()) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
  }

  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }))
}

const hasAnalyticsConsent = () => readConsent() === 'accepted'

export {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_EVENT,
  readConsent as getCookieConsent,
  writeConsent as setCookieConsent,
  hasAnalyticsConsent,
}
