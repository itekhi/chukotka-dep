'use client'
import Script from 'next/script'

export function GosuslugiOG() {
  return (
    <>
      <div id="e329fb40-widget-pos"></div>
      <Script
        id="e329fb40"
        src="https://pos.gosuslugi.ru/og/widget/js/main.js"
        strategy="afterInteractive"
        data-src-host="https://pos.gosuslugi.ru/og"
        data-org-id="34734"
        onReady={() => {
          console.info('Gosuslugi OG widget ready!')
        }}
      />
    </>
  )
}
