import type { BigTilesBlock as BigTilesBlockProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import RichText from '@/components/RichText'
import { ImageMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const BigTilesBlock: React.FC<BigTilesBlockProps> = async ({ blockTitle, tiles }) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tiles?.map(({ id, richText, image, background, textColor }) => (
          <div
            key={id}
            className={cn(
              'flex flex-col items-center rounded-4xl',
              background === 'gradient'
                ? 'bg-gradient-primary'
                : background === 'tint'
                  ? 'bg-tint'
                  : 'bg-gray-light',
            )}
          >
            <RichText
              data={richText}
              className={cn(
                'w-full p-base font-normal leading-tight p-6 pb-4',
                textColor === 'darkblue' && 'text-primary-muted',
              )}
              brDisablerBreakpoint="xl"
            />

            <ImageMedia
              resource={image}
              className="w-full md:w-auto max-h-40 md:max-h-48 mt-auto object-contain object-bottom"
            />
          </div>
        ))}
      </div>
    </BlockContainer>
  )
}
