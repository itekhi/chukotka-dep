'use client'
import Script from 'next/script'

export default function WidgetScript() {
  return (
    <Script
      src="https://pos.gosuslugi.ru/bin/script.min.js"
      strategy="lazyOnload"
      onReady={() => {
        try {
          // @ts-expect-error Widget is a function coming from script
          Widget('https://pos.gosuslugi.ru/form', 392552)
        } catch (error) {
          console.error('Gosuslugi Widget error:', error)
        }
      }}
    />
  )
}
