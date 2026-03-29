import { ContentTilesBlock as ContentTilesProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { ImageMedia } from '@/components/Media'

export const ContentTilesBlock = ({ blockTitle, tiles }: ContentTilesProps) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-7">
        {tiles.map(({ id, withGradient, richText, image }) => (
          <div
            key={id}
            className={cn(
              'min-h-52 flex flex-col md:flex-row justify-between gap-7 md:gap-10 p-7 rounded-4xl overflow-hidden',
              withGradient ? 'bg-gradient-primary' : 'bg-tint',
            )}
          >
            <RichText data={richText} className={cn('max-w-160 xl:max-w-none')} />

            <ImageMedia resource={image} className="self-center w-auto h-36 py-1 pr-2" />
          </div>
        ))}
      </div>
    </BlockContainer>
  )
}
