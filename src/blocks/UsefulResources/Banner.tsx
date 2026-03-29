// 'use client'

import type { UsefulResourcesBlock } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ImageMedia } from '@/components/Media'
import RichText from '@/components/RichText'
// import useClickableCard from '@/utilities/useClickableCard'

const Banner = ({ banner }: { banner: UsefulResourcesBlock['banner'] }) => {
  // const { cardRef, linkRef } = useClickableCard<HTMLDivElement>({})

  return (
    <div className="relative w-full lg:w-1/2 overflow-hidden">
      <div className="h-96 lg:h-auto lg:absolute lg:inset-0 select-none">
        <ImageMedia
          resource={banner.image}
          className="size-full rounded-3xl overflow-hidden object-cover pointer-events-none lg:object-left"
        />
      </div>

      <div className="text-primary lg:absolute top-8 inset-x-8 py-5 lg:py-0">
        <p className="h-xl text-lb">{banner.title}</p>

        {banner.richText && <RichText data={banner.richText} className="mt-3" />}

        <CMSLink
          {...banner.link}
          appearance="primary"
          className="group-hover:bg-primary-muted mt-4"
        />
      </div>
    </div>
  )
}

export default Banner
