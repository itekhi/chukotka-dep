import type { InfoTilesBlock as InfoTilesProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { ImageMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

type TileType = InfoTilesProps['tile1']

export const InfoTilesBlock: React.FC<InfoTilesProps> = ({ blockTitle, tile1, tile2, tile3 }) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-2 gap-3.5 sm:gap-4.5">
        <Tile variant="big" tile={tile1} />
        <Tile variant="normal" tile={tile2} />
        <Tile variant="normal" tile={tile3} />
      </div>
    </BlockContainer>
  )
}

const Tile = ({ variant, tile }: { variant: 'big' | 'normal'; tile: TileType }) => {
  const isBig = variant === 'big'

  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row justify-between gap-6 sm:gap-10 lg:gap-5 p-6 bg-white rounded-3xl relative',
        isBig ? 'min-h-52 xl:min-h-[unset] xl:flex-col row-span-2' : 'min-h-50 justify-between',
      )}
    >
      <div className="flex flex-col items-start gap-2.5 sm:max-w-132">
        <p className="h-xl md:h-1.5xl">{tile.title}</p>
        <p className="p-base md:p-md xl:text-lb leading-tight">{tile.text}</p>
        <CMSLink {...tile.link} appearance="primary" className="mt-1.5" />
      </div>

      <div
        className={cn(
          'shrink-0 flex items-center sm:justify-center sm:pr-8 xl:pr-0',
          isBig ? 'xl:grow xl:w-full' : 'sm:h-full',
        )}
      >
        <ImageMedia
          resource={tile.image}
          className={cn(
            'h-full w-auto object-center object-contain',
            isBig
              ? 'max-h-38 sm:max-h-26 lg:max-h-30 xl:max-h-44'
              : 'min-h-38 sm:min-h-[unset] max-h-38 sm:max-h-32 md:max-h-34 lg:max-h-38 xl:max-h-34',
          )}
        />
      </div>
    </div>
  )
}
