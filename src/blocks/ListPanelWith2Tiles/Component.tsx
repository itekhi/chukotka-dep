import type { ListPanelWith2TilesBlock as ListPanelWith2TilesProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { ListPanel } from '../ListPanel'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { ImageMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

type TileType = ListPanelWith2TilesProps['tile1'] | ListPanelWith2TilesProps['tile2']

export const ListPanelWith2TilesBlock = (props: ListPanelWith2TilesProps) => {
  const { blockTitle, swapped, listPanel, tile1, tile2 } = props

  return (
    <BlockContainer title={blockTitle}>
      <div
        className={cn(
          'flex gap-5 xl:gap-7',
          swapped ? 'flex-col-reverse xl:flex-row-reverse' : 'flex-col xl:flex-row',
        )}
      >
        <ListPanel panel={listPanel || {}} className="xl:w-1/2" />

        <div className="flex flex-col gap-5 xl:w-1/2">
          <Tile {...tile1} className="bg-white" />
          <Tile {...tile2} className="bg-tint" />
        </div>
      </div>
    </BlockContainer>
  )
}

const Tile = (props: TileType & { className?: string }) => {
  const { title, richText, textColor, link, image, className } = props
  return (
    <div
      className={cn(
        'grow flex flex-col sm:flex-row justify-between gap-5.5 md:gap-10 p-5 md:p-7 rounded-3xl overflow-hidden',
        className,
      )}
    >
      <div className="max-w-152 xl:max-w-none flex flex-col items-start gap-4">
        {title && <p className="h-1.5xl">{title}</p>}

        <RichText
          data={richText}
          className={cn(textColor === 'darkblue' && 'text-primary-muted')}
        />

        <CMSLink {...link} appearance="primary" size="smallToDefault" />
      </div>

      <ImageMedia
        resource={image}
        className={cn(
          'self-end sm:self-center shrink-0 xl:w-36 h-auto mb-2 sm:m-0 xl:m-0',
          link && link.type !== 'off' ? 'w-32 -mt-12' : 'w-36 self-start ml-2',
        )}
      />
    </div>
  )
}
