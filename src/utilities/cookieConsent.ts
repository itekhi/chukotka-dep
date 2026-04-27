// @ts-expect-error ...
import Cookies from 'js-cookie'

// Define your cookie configuration in one place
const CONSENT_COOKIE_NAME = 'cookies-consent'
const DEFAULT_COOKIE_OPTIONS = {
  expires: 365,
  sameSite: 'strict',
  secure: true,
  path: '/',
}

export type Consent = 'granted' | 'denied' | undefined

/**
 * Sets the consent cookie with a value and additional options
 * @param value - Consent value (true, false, 'granted', 'denied')
 * @param extraOptions - Extra cookie options to merge with defaults
 */
export const setCookieConsent = (value: NonNullable<Consent>, extraOptions: object = {}) => {
  const options = { ...DEFAULT_COOKIE_OPTIONS, ...extraOptions }
  Cookies.set(CONSENT_COOKIE_NAME, value.toString(), options)
}

/**
 * Retrieves the raw consent cookie value
 * @returns The cookie value or undefined if not found
 */
export const getCookieConsent = (): Consent => {
  return Cookies.get(CONSENT_COOKIE_NAME)
}

/**
 * Checks if user has given consent
 * @returns True if consent is granted
 */
export const hasCookieConsent = (): boolean => {
  const consentValue = getCookieConsent()
  return consentValue === 'granted'
}

/**
 * Resets/removes the consent cookie
 */
export const resetCookieConsent = () => {
  Cookies.remove(CONSENT_COOKIE_NAME, { path: DEFAULT_COOKIE_OPTIONS.path })
}

/**
 * Gets detailed consent status for tracking control
 * @returns Consent status object
 */
export const getCookieConsentStatus = (): object => {
  const consentValue = getCookieConsent()
  const granted = hasCookieConsent()

  return {
    granted,
    value: consentValue,
    exists: consentValue !== undefined,
  }
}
