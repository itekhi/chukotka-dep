import { CollapsibleBlocksBannersGridBlock } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ImageMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

type BannerType = CollapsibleBlocksBannersGridBlock['banners'][0]
type Variants = CollapsibleBlocksBannersGridBlock['variant']

export const BannersGridBlock = (props: CollapsibleBlocksBannersGridBlock) => {
  const { variant, banners } = props

  return (
    <div
      className={cn(
        'grid gap-5 md:gap-6 grid-cols-1',
        variant === '2col' ? 'lg:grid-cols-2' : 'lg:grid-cols-3',
      )}
    >
      {banners.map((banner) => (
        <Banner key={banner.id} variant={variant} {...banner} />
      ))}
    </div>
  )
}

const Banner = ({
  variant,
  title,
  image,
  link,
  withGradient,
}: BannerType & { variant: Variants }) => {
  const isTwoCol = variant === '2col'

  return (
    <div
      className={cn(
        'flex justify-between items-start gap-10 p-7.5 rounded-3xl overflow-hidden',
        isTwoCol
          ? 'flex-col sm:flex-row lg:flex-col xl:flex-row'
          : 'lg:min-h-112 flex-col sm:flex-row lg:flex-col',
        withGradient ? 'bg-gradient-primary' : 'bg-tint',
      )}
    >
      <div>
        <p className="h-1.5xl md:text-lb">{title}</p>
        <CMSLink {...link} appearance="primary" size="smallToDefault" className="mt-5" />
      </div>

      <div className="shrink-0">
        <ImageMedia
          resource={image}
          className={cn(
            'w-auto object-contain',
            isTwoCol ? 'h-38 lg:h-40 xl:h-36 my-auto' : 'h-38 lg:h-40 xl:h-44',
          )}
        />
      </div>
    </div>
  )
}
