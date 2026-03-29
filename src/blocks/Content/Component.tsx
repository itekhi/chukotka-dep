import React from 'react'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
// import { cn } from '@/utilities/ui'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { richText, link } = props

  return (
    <div className="container">
      <RichText data={richText} sizing="medium" />

      <CMSLink {...link} />
    </div>
  )
}
