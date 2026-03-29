import type { BannersGridBlock as BannersGridProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { ImageMedia, isMedia } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type BannerType = NonNullable<BannersGridProps['banners']>[0]

export const BannersGridBlock: React.FC<BannersGridProps> = ({ blockTitle, banners }) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-6">
        {banners.map((banner) => (
          <Banner key={banner.id} banner={banner} />
        ))}
      </div>
    </BlockContainer>
  )
}

const Banner = ({ banner }: { banner: BannerType }) => {
  const { title, richText, link, bgImage, objectImage } = banner
  const hasObjectImg = isMedia(objectImage)
  const hasLink = link.type !== 'off'

  return (
    <div className="xl:min-h-68 bg-white rounded-4xl overflow-hidden relative">
      <div
        className={cn(
          'size-full flex flex-col items-start gap-5 p-6.5 relative z-10',
          hasObjectImg && `${hasLink ? 'pb-16' : 'pb-26'} md:pb-6.5`,
        )}
      >
        {title && <p className="h-1.5xl -mb-1">{title}</p>}

        <RichText
          data={richText}
          className={cn('[&_li]:my-2', hasObjectImg && 'md:pr-50 lg:pr-36 xl:pr-44')}
        />

        <CMSLink {...link} size="smallToDefault" appearance="primary" className="mt-auto" />
      </div>

      <ImageMedia resource={bgImage} className="size-full absolute z-0 inset-0 object-cover" />
      <ImageMedia
        resource={objectImage}
        className="h-28 w-auto md:h-auto md:w-48 lg:w-38 xl:w-46 absolute z-10 right-0 bottom-0 object-contain object-bottom-right"
      />
    </div>
  )
}
