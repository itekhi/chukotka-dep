'use client'

import type { InfoCardsBlock as InfoCardsProps } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'

import BlockContainer from '../BlockContainer'

import { NextButton, PrevButton, usePrevNextButtons } from '@/components/CarouselArrows'
import NewsCard from '@/components/NewsCard'

export const InfoCardsBlock = ({ blockTitle, cards }: InfoCardsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <BlockContainer title={blockTitle} titleClassName="lg:text-lb">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div
            className="embla__container"
            // @ts-expect-error ...
            style={{ '--slide-width': '19.5rem' }}
          >
            {cards?.map(({ id, title, text, link }) => (
              <div key={id} className="embla__slide">
                <NewsCard data={{ title, text, link }} titleSize="small" className="size-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls mt-6">
          <div className="embla__dots">
            {/*{scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(index === selectedIndex ? ' active' : '')}
              />
            ))}*/}
          </div>

          <div className="embla__buttons">
            {(!prevBtnDisabled || !nextBtnDisabled) && (
              <>
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              </>
            )}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
