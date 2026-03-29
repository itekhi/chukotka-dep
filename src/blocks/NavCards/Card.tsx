import type { NavCardsBlock } from '@/payload-types'

import { ImageMedia } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import useClickableCard from '@/utilities/useClickableCard'
import { cn } from '@/utilities/ui'

type CardType = React.FC<{
  data: NonNullable<NavCardsBlock['cards']>[0]
  className?: string
}>

const Card: CardType = ({ data, className }) => {
  const { title, subtitle, description, image, link } = data

  const { cardRef, linkRef } = useClickableCard({ newTab: link.newTab ?? false })

  return (
    <article
      ref={cardRef}
      className={cn(
        'w-full min-h-86 flex flex-col gap-6 rounded-[20px] overflow-hidden cursor-pointer',
        'bg-white hover:bg-tint hover:shadow-xl/8 md:hover:scale-[103.5%] transition-all',
        className,
      )}
    >
      <div className="pt-5 px-5">
        <CMSLink ref={linkRef} {...link}>
          <p className="p-base font-medium">{title}</p>
        </CMSLink>

        {subtitle && <p className="p-xs font-medium mt-0.75">{subtitle}</p>}

        <p className="p-sm font-normal mt-4">{description}</p>
      </div>

      <ImageMedia resource={image} size="260px" className="w-[85%] mt-auto mx-auto select-none" />
    </article>
  )
}

export default Card
