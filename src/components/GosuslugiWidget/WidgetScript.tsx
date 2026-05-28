'use client'
import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'

export function WidgetScript() {
  const widget = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent server-side rendering entirely to avoid Error 418
  if (!isMounted) {
    return null
  }

  return (
    <Script
      src="https://pos.gosuslugi.ru/bin/script.min.js"
      strategy="afterInteractive"
      onReady={() => {
        try {
          // @ts-expect-error Widget is a function coming from script
          widget.current = Widget('https://pos.gosuslugi.ru/form', 392552)
        } catch (error) {
          console.error('Gosuslugi Widget error:', error)
        }
      }}
      suppressHydrationWarning
    />
  )
}
