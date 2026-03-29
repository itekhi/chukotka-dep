import { CollapsibleBlocksBannerBlock } from '@/payload-types'

import { ImageMedia } from '@/components/Media'
import Countdown from '@/components/Countdown'
import { CMSLink } from '@/components/Link'

export const BannerBlock = (props: CollapsibleBlocksBannerBlock) => {
  const { title, link, bgImage, objectImage, withCountdown, countdown } = props

  return (
    <div className="w-full md:min-h-94 flex flex-col sm:flex-row items-stretch rounded-3xl overflow-hidden relative">
      <div className="flex flex-col items-start gap-5.5 p-7 relative z-20">
        <p className="h-lg md:h-xl md:text-lb leading-tight pr-10 sm:pr-0">{title}</p>

        {withCountdown && countdown && (
          <div className="flex flex-col items-start gap-3">
            {countdown.title && <p className="p-md">{countdown.title}</p>}
            <Countdown endDateTime={countdown.endDateTime} />
          </div>
        )}

        <CMSLink
          {...link}
          appearance="primary"
          size="smallToDefault"
          className="mt-2 sm:mt-4 md:mt-auto"
        />
      </div>

      <div className="w-full sm:w-auto sm:min-w-44 grow relative z-10">
        <ImageMedia
          resource={objectImage}
          className="max-h-52 sm:max-h-72 w-full h-auto sm:w-auto sm:max-w-96 md:max-w-116 sm:absolute bottom-0 left-1/2 sm:-translate-x-1/2 object-contain"
        />
      </div>

      <ImageMedia
        resource={bgImage}
        className="blur-xs sm:blur-none size-full absolute inset-0 z-0 object-cover"
      />
    </div>
  )
}
