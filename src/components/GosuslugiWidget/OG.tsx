'use client'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import BlockContainer from '@/blocks/BlockContainer'

export function GosuslugiOG() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent server-side rendering entirely to avoid Error 418
  if (!isMounted) {
    return null
  }

  return (
    <BlockContainer className="mb-2.5">
      <div id="e329fb40-widget-pos"></div>
      <Script
        id="e329fb40"
        src="https://pos.gosuslugi.ru/og/widget/js/main.js"
        strategy="afterInteractive"
        data-src-host="https://pos.gosuslugi.ru/og"
        data-org-id="34734"
        onReady={() => {
          // manually invoke the script's global widget function.
          if (typeof window !== 'undefined' && typeof (window as any).widget === 'function') {
            ;(window as any).widget()
          }
        }}
        suppressHydrationWarning
      />
    </BlockContainer>
  )
}
