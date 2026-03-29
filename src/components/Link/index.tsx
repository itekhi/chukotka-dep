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
  url?: string | null
  withExternalIcon?: boolean
}

type CMSLinkComponentType = React.ForwardRefRenderFunction<HTMLAnchorElement, CMSLinkType>

export const getReferenceHref = (ref: CMSLinkType['reference']) => {
  const { relationTo, value } = ref || {}
  const pre = relationTo !== 'pages' ? `/${relationTo}` : ''
  const slug = (typeof value === 'object' ? value?.slug : ref?.slug) || ''

  return `${pre}/${slug !== 'home' ? slug : ''}`
}

const getDocumentHref = (doc: CMSLinkType['document']) => {
  return typeof doc === 'object' ? doc?.url : null
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
    anchor,
    url,
    withExternalIcon,
  } = props

  if (type === 'off') return null

  const anc = anchor ? `#${anchor}` : ''
  const href =
    type === 'reference'
      ? getReferenceHref(reference) + anc
      : type === 'document'
        ? getDocumentHref(document)
        : url + anc

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps

  const otherProps = {
    ...(newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}),
    ...(type === 'document' ? { download: true } : {}),
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
      <Link ref={ref} className={cn(className)} href={href || url || ''} {...otherProps}>
        {label ? label : children}
        {withExternalIcon && type === 'custom' && <ExternalIcon />}
      </Link>
    </Button>
  )
}

export const CMSLink = forwardRef(CMSLinkComponent)
