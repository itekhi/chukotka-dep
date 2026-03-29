import React from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const MediaBlock: React.FC<MediaBlockProps> = ({ media }) => {
  return <div className={cn('container')}>{media && <Media resource={media} />}</div>
}
