'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type HeaderNavType = React.FC<{ data: HeaderType; className?: string }>

export const HeaderNav: HeaderNavType = ({ data, className }) => {
  const navItems = data?.navItems || []

  return (
    <nav className={cn('flex gap-3 items-center justify-between pt-8', className)}>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className="block font-light text-base lg:text-[17px] xl:text-lg hover:text-primary transition-colors"
            withExternalIcon
          />
        )
      })}
      {/*<Link href="/search">
        <span className="sr-only">Search</span>
      </Link>*/}
    </nav>
  )
}
