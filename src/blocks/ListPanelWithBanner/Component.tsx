import type { ListPanelWithBannerBlock as ListPanelWithBannerProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { ListPanel } from '../ListPanel'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { ImageMedia, isMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const ListPanelWithBannerBlock = (props: ListPanelWithBannerProps) => {
  const { blockTitle, swapped, listPanel, banner } = props
  const withBannerImg = isMedia(banner.image)

  return (
    <BlockContainer title={blockTitle}>
      <div
        className={cn(
          'flex gap-5',
          swapped ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row',
        )}
      >
        <ListPanel panel={listPanel || {}} className="lg:w-1/2" />

        <div
          className={cn(
            'lg:w-1/2 flex flex-col sm:flex-row lg:flex-col gap-4 md:gap-7 p-7 rounded-4xl relative',
            banner.withGradient ? 'bg-gradient-primary' : 'bg-gray-light',
          )}
        >
          <div className="flex flex-col items-start gap-4">
            <RichText
              data={banner.text}
              className={cn(
                'text-primary-muted',
                withBannerImg && banner.imagePlacement === 'onRight' && 'lg:pr-20 xl:pr-48',
              )}
            />

            <CMSLink {...banner.link} appearance="primary" />
          </div>

          {withBannerImg && (
            <div className="flex-centered shrink-0 grow relative">
              <ImageMedia
                resource={banner.image}
                className={cn(
                  'shrink-0 object-center w-40 md:w-42 lg:w-52 my-3 mr-5 lg:m-0',
                  banner.imagePlacement === 'onRight'
                    ? 'lg:absolute right-5 bottom-5'
                    : 'lg:absolute bottom-0 lg:w-auto lg:h-full',
                )}
              />
            </div>
          )}
        </div>
      </div>
    </BlockContainer>
  )
}
