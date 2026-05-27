import { CMSLink } from '@/components/Link'
import type { HeadingBlock as HeadingBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'

const Wrapper = ({ Elem, link, className, children }: any) => {
  if (link && link?.type !== 'off') {
    return (
      <CMSLink {...link} className={cn('link-hover', className)}>
        <Elem>{children}</Elem>
      </CMSLink>
    )
  }
  return <Elem className={className}>{children}</Elem>
}

export const HeadingBlock: React.FC<HeadingBlockProps> = (props) => {
  const { type, link, title, hidden, subline, horizontalAlignment } = props

  return (
    <div
      className={cn('container flex', hidden && 'sr-only')}
      style={{ justifyContent: horizontalAlignment || '' }}
    >
      <Wrapper Elem={type} link={link} className={cn('block-title-large', subline && 'subline')}>
        {title}
      </Wrapper>
    </div>
  )
}
