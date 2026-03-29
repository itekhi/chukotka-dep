import { MediaCardsBlock as MediaCardsProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { ImageMedia } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import Image from 'next/image'

type CardType = MediaCardsProps['cards'][0]

export const MediaCardsBlock = ({ blockTitle, cards }: MediaCardsProps) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="off-container flex gap-5 lg:gap-7 overflow-auto pt-2 pb-6.5">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </BlockContainer>
  )
}

const Card = ({ title, image, link }: CardType) => {
  return (
    <CardWrapper
      link={link}
      className="min-w-72 w-1/4 flex flex-col items-center justify-between gap-5 p-7 bg-white rounded-3xl"
      linkClassName="hover:bg-tint hover:shadow-lg shadow-black/8 hover:scale-[103%] transition-[scale,background-color,box-shadow]"
    >
      <span className="h-xl text-lb text-center mt-1">{title}</span>

      <ImageMedia resource={image} className="shrink-0 w-auto h-42 mt-7" />
    </CardWrapper>
  )
}

const CardWrapper = ({ link, className, linkClassName, children }: any) => {
  if (link && link.type !== 'off') {
    return (
      <CMSLink {...link} className={cn('relative', className, linkClassName)}>
        {children}

        <Image
          src="/assets/link-icon.svg"
          alt=""
          width={24}
          height={24}
          className="w-4 absolute bottom-4 right-4 opacity-40"
        />
      </CMSLink>
    )
  } else {
    return <div className={className}>{children}</div>
  }
}
