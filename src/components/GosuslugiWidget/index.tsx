'use client'
import { useRef } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

// declare global {
//   interface Window {
//     Widget: () => void;
//   }
// }

export default function GosuslugiWidget({ className }: { className?: string }) {
  const widget = useRef(null)

  return (
    <>
      <button
        type="button"
        id="js-show-iframe-wrapper"
        className={cn('pos-banner-fluid', className)}
      >
        <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-primary hover:bg-tint transition-colors cursor-pointer">
          <div className="flex flex-col gap-2">
            <Image
              src="https://pos.gosuslugi.ru/bin/banner-fluid/gosuslugi-logo-with-slogan-blue.svg"
              alt="Гоуслуги лого"
              width={53}
              height={14}
              className="w-17 pt-1"
            />

            <p className="text-sm font-medium text-primary-muted mt-auto">Есть вопрос?</p>
          </div>

          <Image
            src="https://pos.gosuslugi.ru/bin/icons/finger-up-logo.svg"
            alt="Гоуслуги палец"
            width={41}
            height={40}
            className="size-11 ml-18"
          />
        </div>
      </button>

      <Script
        src="https://pos.gosuslugi.ru/bin/script.min.js"
        strategy="afterInteractive"
        onReady={() => {
          try {
            // @ts-expect-error Widget is a function coming from script
            widget.current = Widget('https://pos.gosuslugi.ru/form', 392552)
            console.info('Gosuglugi Widget ready')
          } catch (error) {
            console.error('Gosuslugi Widget error:', error)
          }
        }}
      />
    </>
  )
}
