'use client'

// import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import type { TeamCardsBlock as TeamCardsBlockProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { cn } from '@/utilities/ui'

import Card from './Card'
import { PrevButton, NextButton, usePrevNextButtons } from './CarouselArrows'

type Props = {
  className?: string
} & TeamCardsBlockProps

export const TeamCardsBlock: React.FC<Props> = ({ blockTitle, cards }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', duration: 15 })

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <BlockContainer title={blockTitle}>
      <div className="relative">
        <div className="embla lg:overflow-hidden">
          <div className="embla__viewport" ref={emblaRef}>
            <div
              className="embla__container"
              // @ts-expect-error ...
              style={{ '--slide-width': '19.57rem', '--slide-gap': '1.25rem' }}
            >
              {cards?.map((card) => (
                <div key={card.id} className="embla__slide">
                  <Card data={card} className={cn('size-full')} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="absolute top-40 left-0 -translate-x-1/2"
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="absolute top-40 right-0 translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
