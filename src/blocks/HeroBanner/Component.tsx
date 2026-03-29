import type { HeroBannerBlock as HeroBannerProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { ImageMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const HeroBannerBlock: React.FC<HeroBannerProps> = ({
  image,
  title,
  description,
  titleAsH1,
}) => {
  const TitleComp = titleAsH1 ? 'h1' : 'p'

  return (
    <BlockContainer idFrom={title}>
      <div className="h-72 md:h-105 rounded-3xl overflow-hidden relative">
        <ImageMedia
          resource={image}
          // size="100vw, (min-width: 1376px) 1400px"
          className="size-full object-cover object-top"
        />

        <div className="xl:hidden bg-linear-to-br from-black/60 to-90% lg:to-60% to-transparent absolute inset-0" />

        <div
          className={cn(
            'flex flex-col xl:flex-row xl:justify-between gap-3 md:gap-5 xl:gap-8',
            'pt-8 md:pt-12 lg:pt-14 xl:pt-28 px-7 md:px-12 xl:px-28',
            'text-white absolute top-0 inset-x-0 z-10',
          )}
        >
          <TitleComp className="h-xl md:h-3xl xl:text-lb">{title}</TitleComp>

          <p className="md:max-w-140 xl:max-w-96 shrink-0 p-base md:p-md xl:text-lb xl:mt-2">
            {description}
          </p>
        </div>
      </div>
    </BlockContainer>
  )
}
