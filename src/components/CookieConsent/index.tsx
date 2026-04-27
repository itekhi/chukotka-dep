import { getCachedGlobal } from '@/utilities/getGlobals'

import ClientCookieConsent from './Component.client'

export default async function CookieConsent() {
  const settingsData = await getCachedGlobal('settings', 1)()

  // @ts-expect-error result type from getCachedGlobal messes all globals props...
  return <ClientCookieConsent settings={settingsData} />
}
