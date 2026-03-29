import { BannerBlock as BannerProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import RichText from '@/components/RichText'
import { ImageMedia } from '@/components/Media'

export const BannerBlock = (props: BannerProps) => {
  const { title, richText, image, titleAsH2 } = props
  const TitleComp = titleAsH2 ? 'h2' : 'p'

  return (
    <BlockContainer idFrom={title}>
      <div className="flex flex-col lg:flex-row gap-5 min-h-86 bg-gray-light rounded-4xl relative p-6 sm:p-8">
        <div className="flex flex-col gap-11">
          {title && <TitleComp className="h-3xl subline">{title}</TitleComp>}

          <RichText data={richText} className="w-full lg:max-w-140 xl:max-w-2xl" />
        </div>

        <ImageMedia
          resource={image}
          className="self-center lg:max-h-64 xl:max-h-none w-full lg:w-auto h-auto lg:h-full lg:absolute bottom-0 right-0 -mb-6 sm:-mb-8 lg:mb-0"
        />
      </div>
    </BlockContainer>
  )
}
