import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center gap-7 py-28">
      <h1 className="h-3xl text-center">Страница не найдена</h1>

      <Button asChild variant="primary">
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  )
}
