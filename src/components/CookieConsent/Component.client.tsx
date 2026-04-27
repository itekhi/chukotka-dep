'use client'

import { useLayoutEffect, useState } from 'react'
import { Setting } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/Button'
import { setCookieConsent, getCookieConsent, Consent } from '@/utilities/cookieConsent'
import { cn } from '@/utilities/ui'

export default function ClientCookieConsent({
  settings: { privacyPolicyLink },
  onAccept,
}: {
  settings: Setting
  onAccept?: () => void
}) {
  const [consent, setConsent] = useState<Consent | null>(null)

  const handleAccept = () => {
    setCookieConsent('granted')
    onAccept?.()
    setConsent('granted')
  }

  useLayoutEffect(() => {
    setConsent(getCookieConsent())
  }, [])

  return (
    consent === undefined && (
      <div
        className={cn(
          'md:w-lg p-6.5 md:p-7.5 fixed left-4 right-4 bottom-4 md:left-[unset] md:right-10 md:bottom-10 z-99999',
          'shadow-md shadow-black/15 md:shadow-xl bg-white rounded-3xl',
        )}
      >
        {/* prettier-ignore */}
        <p className="p-sm text-center leading-[1.3]">
          Продолжая пользоваться настоящим сайтом, вы выражаете <CMSLink {...privacyPolicyLink} className="text-primary hover:underline">согласие на обработку ваших персональных данных</CMSLink> с использованием сервиса аналитики Яндекс Метрика. В случае несогласия с обработкой ваших персональных данных вы можете отключить сохранение cookies в настройках вашего браузера.
        </p>

        <div className="flex justify-center w-full mt-5">
          <Button variant="primary" onClick={handleAccept} className="px-20">
            ОК
          </Button>
        </div>
      </div>
    )
  )
}
