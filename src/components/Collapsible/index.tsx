'use client'

import { useState, HTMLElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'

type CollapsibleProps = {
  title: string
  titleSize?: 'normal' | 'large'
  titleElement?: HTMLElementType
  subtitle?: string | null | undefined
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  childContainerClassName?: string
  containerOverflowHidden?: boolean
}

const getTitleSizeClass = (size: CollapsibleProps['titleSize']) => {
  if (size === 'large') return 'block-title-large'
  return 'block-title-normal'
}

export default function Collapsible({
  title,
  titleSize = 'large',
  titleElement = 'h2',
  subtitle,
  defaultOpen = false,
  className,
  childContainerClassName,
  containerOverflowHidden = true,
  children,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const TitleComp = titleElement

  return (
    <div className={cn('border-y-2', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full flex items-center justify-between py-7.5"
      >
        <div
          className={cn(
            'pr-4 subline text-left *:group-hover:opacity-60 *:transition-opacity',
            !isOpen && 'subline-collapsed',
          )}
        >
          <TitleComp className={cn('block-title-large md:text-lb', getTitleSizeClass(titleSize))}>
            {title}
          </TitleComp>

          {subtitle && (
            <p className="text-base md:text-xl leading-[1.2] mt-2 mb-1 md:my-0.5">{subtitle}</p>
          )}
        </div>

        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          {/* prettier-ignore */}
          <svg className="size-12 md:size-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="29" transform="rotate(90 30 30)" stroke="#C2C2C2" strokeWidth="2" />
            <path fill="#C2C2C2" fillRule="evenodd" clipRule="evenodd" d="M29.8578 37.435L43.2928 24L44.707 25.4142L30.5649 39.5563L29.8578 40.2635L29.1507 39.5563L15.0085 25.4142L16.4228 24L29.8578 37.435Z" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
            className={containerOverflowHidden ? 'overflow-hidden' : ''}
          >
            <div className={cn('h-full pt-4 pb-7.5', childContainerClassName)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
