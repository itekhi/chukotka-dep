'use client'

import React from 'react'
import { motion } from 'motion/react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { SocialLinksIcons } from '../SocialLinksIcons'

type HeaderMobileNavType = React.FC<{ data: HeaderType; className?: string }>

export const HeaderMobileNav: HeaderMobileNavType = ({ data, className }) => {
  const navItems = data?.navItems || []

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'bg-white rounded-b-2.5xl shadow-[0px_15px_15px_-5px_rgba(0,0,0,0.18)] px-5 pt-9 pb-6 md:pt-11 md:pb-9',
        className,
      )}
    >
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 w-full">
        {navItems.map(({ link }, i) => {
          return (
            <li key={i} className="md:text-center">
              <CMSLink
                {...link}
                appearance="inline"
                className="p-base md:p-md font-light hover:text-primary"
                withExternalIcon
              />
            </li>
          )
        })}
      </ul>

      {data.socialLinks && (
        <div className="flex items-center gap-4 md:hidden mt-6">
          <SocialLinksIcons socialLinks={data.socialLinks} />
        </div>
      )}
    </motion.nav>
  )
}
