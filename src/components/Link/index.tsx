import React, { forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import type { Document, Page } from '@/payload-types'

import { Button, type ButtonProps } from '@/components/Button'
import { cn } from '@/utilities/ui'

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: Page | string | number
    slug?: string
  } | null
  document?: Document | string | null
  size?: ButtonProps['size'] | null
  type?: 'off' | 'custom' | 'reference' | 'document' | null
  anchor?: string | null | undefined
  download?: boolean
  url?: string | null
  withExternalIcon?: boolean
}

type GetHrefArgs = Pick<CMSLinkType, 'type' | 'reference' | 'document' | 'anchor'>

export const getHref = (args: GetHrefArgs & { url?: string | null }) => {
  const { type, reference: ref, document: doc, anchor, url } = args
  let href = url
  const anc = anchor ? `#${anchor}` : ''

  if (type === 'reference') {
    const { relationTo, value } = ref || {}
    const pre = relationTo !== 'pages' ? `/${relationTo}` : ''
    const slug = (typeof value === 'object' ? value?.slug : ref?.slug) || ''

    href = `${pre}/${slug !== 'home' ? slug : ''}`
  } else if (type === 'document') {
    href = typeof doc === 'object' ? doc?.url : null
  }
  return href + anc
}

type CMSLinkComponentType = React.ForwardRefRenderFunction<HTMLAnchorElement, CMSLinkType>

const CMSLinkComponent: CMSLinkComponentType = (props, ref) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    document,
    size: sizeFromProps,
    download: downloadFromProps,
    anchor,
    url,
    withExternalIcon,
  } = props

  if (type === 'off') return null

  const href = getHref({ type, reference, document, anchor, url })

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps

  const otherProps = {
    ...(newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}),
    ...(type === 'document' ? { download: downloadFromProps ?? true } : {}),
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link ref={ref} className={cn(className)} href={href || url || ''} {...otherProps}>
        {label ? label : children}
        {withExternalIcon && type === 'custom' && <ExternalIcon />}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link ref={ref} className={cn('link', className)} href={href || url || ''} {...otherProps}>
        {label ? label : children}
        {withExternalIcon && type === 'custom' && <ExternalIcon />}
      </Link>
    </Button>
  )
}

const ExternalIcon = () => {
  return (
    <Image
      src="/assets/link-icon.svg"
      alt=""
      width={24}
      height={24}
      className="opacity-60 size-3.75 lg:size-4 inline ml-1.5 mb-0.5 lg:mb-0.75"
    />
  )
}

export const CMSLink = forwardRef(CMSLinkComponent)
