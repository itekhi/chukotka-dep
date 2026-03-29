'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const { breakpoints } = cssVariables

// A base64 encoded image to use as a placeholder while the image is loading
// const placeholderBlur =
//   'data:image/png;base64,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'

/**
 * ImageMedia
 *
 * This component passes a **relative** `src` (e.g. `/media/...`) to Next.js Image.
 * The `getMediaUrl` utility constructs the full URL by prepending the base URL from env vars
 * (NEXT_PUBLIC_SERVER_URL). Next.js then optimizes this using `remotePatterns` configured
 * in next.config.js — no custom `loader` needed.
 *
 * Flow:
 *   1. Resource URL from Payload: `/media/image-123.jpg`
 *   2. getMediaUrl() adds base URL: `https://yourdomain.com/media/image-123.jpg`
 *   3. Next.js Image optimizes via remotePatterns: `/_next/image?url=...&w=1200&q=75`
 *
 * If your storage/plugin returns **external CDN URLs** (e.g. `https://cdn.example.com/...`),
 * choose ONE of the following:
 *   A) Allow the remote host in next.config.js:
 *      images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }] }
 *   B) Provide a **custom loader** for CDN-specific transforms:
 *      const imageLoader: ImageLoader = ({ src, width, quality }) =>
 *        `https://cdn.example.com${src}?w=${width}&q=${quality ?? 75}`
 *      <Image loader={imageLoader} src="/media/hero.jpg" width={1200} height={600} alt="" />
 *   C) Skip optimization:
 *      <Image unoptimized src="https://cdn.example.com/hero.jpg" width={1200} height={600} alt="" />
 *
 * TL;DR: Template uses relative URLs + getMediaUrl() to construct full URLs, then relies on
 * remotePatterns for optimization. Only add `loader` if using external CDNs with custom transforms.
 */

const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    className,
    imgClassName,
    style,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const cacheTag = resource.updatedAt

    src = getMediaUrl(url, cacheTag)
  }

  if (!src) return null

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value < 1280 ? value * 2 : value}w`)
        .join(', ')

  return (
    <NextImage
      alt={alt || ''}
      className={cn(className, imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      // placeholder="blur"
      // blurDataURL={placeholderBlur}
      priority={priority}
      quality={100}
      loading={loading}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
      style={style}
    />
  )
}

export default ImageMedia
