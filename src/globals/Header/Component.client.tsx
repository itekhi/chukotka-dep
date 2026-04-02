'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'motion/react'
import { usePathname, useSearchParams } from 'next/navigation'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo'
import { formatPhone } from '@/fields/phone'
import { cn } from '@/utilities/ui'

import { HeaderNav } from './Nav'
import { HeaderMobileNav } from './Nav/MobileNav'
import CollapsibleX from './CollapsibleX'
import { SocialLinksIcons } from './SocialLinksIcons'

export const HeaderClient: React.FC<{ data: Header }> = ({ data }) => {
  const { phone, socialLinks } = data
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const toggleMenu = () => setMobileNavOpen(!mobileNavOpen)
  const closeMenu = () => setMobileNavOpen(false)

  return (
    <header className="relative z-50 pt-4">
      <div className="container">
        <div
          className={cn(
            'shadow-xl rounded-2.5xl relative transition-shadow',
            mobileNavOpen ? 'shadow-black/15' : 'shadow-black/5',
          )}
        >
          <div className="h-16 md:h-22 flex items-center bg-white rounded-2.5xl pl-5 md:pl-7 pr-5 lg:px-7">
            <Link href="/" className="mr-auto">
              <Logo loading="eager" priority="high" className="w-44 md:w-60" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a
                href={`tel:${formatPhone(phone, 'E.164')}`}
                className="h-lg hover:text-primary transition-colors pt-0.5"
              >
                {phone}
              </a>

              {socialLinks && <SocialLinksIcons socialLinks={socialLinks} />}
            </div>

            <button type="button" onClick={toggleMenu} className="lg:hidden ml-8">
              <CollapsibleX active={mobileNavOpen} className="size-6 md:size-8" />
            </button>
          </div>

          {/* we need to wrap useSearchParams in Suspense... */}
          <Suspense>
            <MobileMenu data={data} open={mobileNavOpen} onClose={closeMenu} />
          </Suspense>
        </div>

        <HeaderNav data={data} className="hidden lg:flex" />
      </div>
    </header>
  )
}

type MobileMenuProps = { data: Header; open: boolean; onClose: () => void }

const MobileMenu = ({ data, open, onClose }: MobileMenuProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // if either location or params (i.e. #hash)
    // changes — we close the menu...
    onClose()
  }, [pathname, searchParams]) // eslint-disable-line

  return (
    <AnimatePresence>
      {open && <HeaderMobileNav data={data} className="absolute inset-x-0 top-[calc(100%-16px)]" />}
    </AnimatePresence>
  )
}
