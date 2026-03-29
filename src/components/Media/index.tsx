import React, { Fragment } from 'react'
import type { Media as MediaType } from '@/payload-types'

import type { Props } from './types'

import ImageMedia from './ImageMedia'
import VideoMedia from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { wrapperElement = null, wrapperClassName, resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = wrapperElement || Fragment

  return (
    <Tag
      {...(wrapperElement !== null
        ? {
            className: wrapperClassName,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}

export const isMedia = (media: string | MediaType | null | undefined) => {
  return typeof media === 'object' && media?.url
}

export { ImageMedia, VideoMedia }
