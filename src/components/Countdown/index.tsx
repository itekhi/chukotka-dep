'use client'
import { useState, useEffect } from 'react'

interface CountdownProps {
  endDateTime: string | Date
}

type FormsType = [string, string, string]

export default function Countdown({ endDateTime }: CountdownProps) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0 })

  useEffect(() => {
    const target = new Date(endDateTime)
    if (isNaN(target.getTime())) return

    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0 })
        return
      }

      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
      })
    }

    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [endDateTime])

  const plural = (n: number, [one, few, many]: FormsType) => {
    const abs = Math.abs(n)
    const rem = abs % 100
    const last = rem % 10
    if (rem > 10 && rem < 20) return many
    if (last > 1 && last < 5) return few
    if (last === 1) return one
    return many
  }

  const parts = [
    { val: time.d, forms: ['день', 'дня', 'дней'] as FormsType },
    { val: time.h, forms: ['час', 'часа', 'часов'] as FormsType },
    { val: time.m, forms: ['минута', 'минуты', 'минут'] as FormsType },
  ]

  return (
    <div className="flex items-stretch h-15 bg-white rounded-xl">
      {parts.map(({ val, forms }, i) => (
        <div
          key={i}
          className="w-22 flex-centered flex-col border-x border-x-gray-light/50 first:border-l-0 last:border-r-0"
        >
          <div className="p-md">{val}</div>
          <div className="p-xs">{plural(val, forms)}</div>
        </div>
      ))}
    </div>
  )
}
