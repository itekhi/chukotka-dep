'use client'
import { useState } from 'react'
import type { LinkCardsGridBlock as LinkCardsGridProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/Button'
import { cn } from '@/utilities/ui'

type CardType = NonNullable<LinkCardsGridProps['cards']>[0]

export const LinkCardsGridBlock = ({ blockTitle, cards, introCard }: LinkCardsGridProps) => {
  const [showAll, setShowAll] = useState(false)

  const cardShown = (idx: number) => {
    if (showAll) return true
    return idx <= (introCard?.enabled ? 2 : 3)
  }

  return (
    <BlockContainer title={blockTitle}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {introCard?.enabled && (
          <div className="flex flex-col gap-3 p-5 text-white bg-primary rounded-2.5xl">
            <p className="h-base">{introCard.title}</p>
            <p className="p-sm leading-[1.2]">{introCard.text}</p>
          </div>
        )}

        {cards.map((card, index) => cardShown(index) && <Card key={card.id} {...card} />)}
      </div>

      <Button onClick={() => setShowAll(!showAll)} className="mt-7">
        {showAll ? 'Свернуть' : 'Показать все'}
      </Button>
    </BlockContainer>
  )
}

const Card = ({ title, text, subtext, link }: CardType) => {
  return (
    <CMSLink
      {...link}
      label={null}
      className={cn(
        'flex flex-col items-start gap-3 p-5 rounded-2.5xl border-2 border-tint text-primary-muted',
        'hover:border-primary hover:bg-tint/50 transition-[background-color,border]',
      )}
    >
      <span className="h-base">{title}</span>
      <span className="p-sm leading-[1.2]">{text}</span>
      {subtext && <span className="p-sm opacity-40">{subtext}</span>}
      <span className="p-base underline mt-auto">Скачать</span>
    </CMSLink>
  )
}
