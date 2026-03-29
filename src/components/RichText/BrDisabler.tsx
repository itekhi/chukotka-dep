'use client'

import { useLayoutEffect, useRef } from 'react'
import { cssVariables } from '@/cssVariables'

export type BreakpointKey = keyof typeof cssVariables.breakpoints

interface Props {
  breakpoint?: BreakpointKey
  minWidth?: number
}

export default function BrDisabler({ breakpoint, minWidth }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const orig = useRef('')

  const minPx = minWidth ?? (breakpoint ? (cssVariables.breakpoints[breakpoint] ?? 0) : 0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const richtext = el.previousElementSibling as HTMLElement | null
    if (!richtext) return

    if (!orig.current) {
      orig.current = richtext.innerHTML
    }

    const update = () => {
      if (window.innerWidth >= minPx) {
        richtext.innerHTML = orig.current
      } else {
        richtext.innerHTML = orig.current
          .replace(/<br\s*\/?>/gi, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim()
      }
    }

    update()

    const mql = matchMedia(`(min-width:${minPx}px)`)

    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [minPx])

  return <div ref={ref} style={{ display: 'none' }} aria-hidden />
}
