import type { TilesGridBlock as TilesGridProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { ImageMedia, isMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

type TileType = NonNullable<TilesGridProps['tiles']>[0]

export const TilesGridBlock: React.FC<TilesGridProps> = ({ blockTitle, tiles, withNumbering }) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
        {tiles.map((tile, index) => (
          <Tile key={tile.id} index={withNumbering ? index + 1 : null} tile={tile} />
        ))}
      </div>
    </BlockContainer>
  )
}

const Tile = ({ index, tile }: { index: number | null; tile: TileType }) => {
  return (
    <div
      className={cn(
        'min-h-28 sm:min-h-40 lg:min-h-44 flex gap-4 p-6 bg-white rounded-3xl relative',
        getTileSizeClasses(tile.size),
      )}
    >
      <div>
        {index !== null && (
          <p className="h-lg sm:h-1.5xl mb-2.5">{String(index).padStart(2, '0')}</p>
        )}
        <p className="p-sm sm:p-base xl:p-md font-medium">{tile.text}</p>
      </div>

      {isMedia(tile.image) && (
        <div className="absolute inset-y-5 right-5">
          <ImageMedia
            resource={tile.image}
            className={cn(
              'h-full object-center lg:object-(--custom-pos-y) object-contain',
              getTileImageSizeClass(tile.size),
            )}
            style={{ '--custom-pos-y': tile.imageAlignY }}
          />
        </div>
      )}
    </div>
  )
}

const getTileSizeClasses = (size: TileType['size']) => {
  switch (size) {
    case 'full':
      return 'lg:col-span-6 has-[img]:pr-30 sm:has-[img]:pr-50 lg:has-[img]:pr-56'
    case 'half':
      return 'lg:col-span-3 has-[img]:pr-30 sm:has-[img]:pr-50 lg:has-[img]:pr-50'
    case 'third':
      return 'lg:col-span-2 has-[img]:pr-30 sm:has-[img]:pr-50 lg:has-[img]:pr-26 xl:has-[img]:pr-34'
  }
}

const getTileImageSizeClass = (size: TileType['size']) => {
  if (size === 'full') return 'w-18 sm:w-28 lg:w-40'
  if (size === 'half') return 'w-18 sm:w-28 lg:w-28 xl:w-34'
  if (size === 'third') return 'w-18 sm:w-28 lg:w-24 xl:w-28'
}
