'use client'
import { CollapsibleBlocksNewsCardsBlock } from '@/payload-types'

import useEmblaCarousel from 'embla-carousel-react'

import NewsCard from '@/components/NewsCard'
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/CarouselArrows'

export const NewsCardsBlock = ({ cards }: CollapsibleBlocksNewsCardsBlock) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  // const [isOpen, setIsOpen] = useState(false)
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [direction, setDirection] = useState(0)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <div className="h-full off-container embla overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div
          className="embla__container"
          // @ts-expect-error ...
          style={{ '--slide-width': '19.55rem' }}
        >
          {cards.map(({ id, title, text, link, publishedAt }) => (
            <div key={id} className="embla__slide">
              <NewsCard
                data={{ title, text, link, publishedAt }}
                shortDateFormat
                className="size-full"
              />
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
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}
