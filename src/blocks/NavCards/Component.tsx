'use client'

// import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import type { NavCardsBlock as NavCardsBlockProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { PrevButton, NextButton, usePrevNextButtons } from '@/components/CarouselArrows'
// import { cn } from '@/utilities/ui'

import Card from './Card'
import { DotButton, useDotButton } from './CarouselDots'

type Props = {
  className?: string
} & NavCardsBlockProps

export const NavCardsBlock: React.FC<Props> = ({ blockTitle, cards }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <BlockContainer title={blockTitle}>
      <div className="embla inner-container">
        <div className="embla__viewport" ref={emblaRef}>
          <div
            className="embla__container"
            // @ts-expect-error ...
            style={{ '--slide-width': '17rem' }}
          >
            {cards?.map((card) => (
              <div key={card.id} className="embla__slide">
                <Card data={card} className="size-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls mt-6">
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(index === selectedIndex ? ' active' : '')}
              />
            ))}
          </div>

          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
