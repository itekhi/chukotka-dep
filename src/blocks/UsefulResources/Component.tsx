import type { UsefulResourcesBlock as UsefulResourcesBlockProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { CMSLink } from '@/components/Link'
import ArrowButton from '@/components/ArrowButton'
import Banner from './Banner'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & UsefulResourcesBlockProps

export const UsefulResourcesBlock: React.FC<Props> = ({ blockTitle, banner, resources }) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="flex flex-col-reverse lg:flex-row lg:items-stretch gap-4 xl:gap-8">
        <div className="flex flex-col gap-3.5 lg:gap-5 w-full lg:w-1/2">
          {resources?.map((resource) => (
            <CMSLink
              key={resource.id}
              {...resource.link}
              className={cn(
                'group flex items-center justify-between gap-3 p-5 lg:p-7 rounded-2.5xl bg-white',
                'hover:bg-tint hover:shadow-lg/8 hover:scale-[103%] transition-all',
              )}
            >
              <span className="p-base md:p-md lg:text-lb font-medium">{resource.text}</span>

              <ArrowButton htmlElement="p" direction="right" className="pointer-events-none" />
            </CMSLink>
          ))}
        </div>

        <Banner banner={banner} />
      </div>
    </BlockContainer>
  )
}
