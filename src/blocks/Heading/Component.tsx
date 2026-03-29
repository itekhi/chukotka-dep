import type { HeadingBlock as HeadingBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'

export const HeadingBlock: React.FC<HeadingBlockProps> = ({ title, hidden }) => {
  return (
    <div className={cn('container', hidden && 'sr-only')}>
      <h1 className="h-2xl">{title}</h1>
    </div>
  )
}
