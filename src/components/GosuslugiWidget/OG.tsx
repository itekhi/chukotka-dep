'use client'
import Script from 'next/script'
import BlockContainer from '@/blocks/BlockContainer'

export default function GosuslugiOG() {
  return (
    <BlockContainer className="mb-2.5">
      <div id="e329fb40-widget-pos"></div>
      <Script
        id="e329fb40"
        src="https://pos.gosuslugi.ru/og/widget/js/main.js"
        strategy="lazyOnload"
        data-src-host="https://pos.gosuslugi.ru/og"
        data-org-id="34734"
        onReady={() => {
          if (typeof window !== 'undefined' && typeof (window as any).widget === 'function') {
            ;(window as any).widget()
          }
        }}
      />
    </BlockContainer>
  )
}
