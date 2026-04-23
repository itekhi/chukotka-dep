'use client'
import { CollapsibleBlocksInfoCardsBlock } from '@/payload-types'

import useEmblaCarousel from 'embla-carousel-react'

import { NextButton, PrevButton, usePrevNextButtons } from '@/components/CarouselArrows'
import { ImageMedia } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type InfoCardType = CollapsibleBlocksInfoCardsBlock['cards'][0]

export const InfoCardsBlock = ({ cards }: CollapsibleBlocksInfoCardsBlock) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  // const [isOpen, setIsOpen] = useState(false)
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [direction, setDirection] = useState(0)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <div className="h-full embla inner-container no-falling-out">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container info-cards-sizing">
          {cards.map(({ id, ...card }) => (
            <div key={id} className="embla__slide">
              <InfoCard {...card} />
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
  )
}

const InfoCard = ({ image, richText, link }: InfoCardType) => {
  return (
    <div className="flex flex-col items-start gap-5.5 h-full">
      <ImageMedia resource={image} className="w-full rounded-2xl overflow-hidden bg-gray-light" />

      <RichText
        data={richText}
        sizing="small"
        className="leading-[1.3] text-primary-muted pr-1.5"
      />

      <CMSLink {...link} appearance="primary" size="smallToDefault" className="mt-auto" />
    </div>
  )
}
