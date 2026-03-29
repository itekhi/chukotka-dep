'use client'
import useEmblaCarousel from 'embla-carousel-react'

import { InfoTileWithSliderBlock as InfoTileWithSliderProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { CMSLink } from '@/components/Link'
import { PrevButton, NextButton, usePrevNextButtons } from '@/components/CarouselArrows'

type SlideType = InfoTileWithSliderProps['slides'][0]

export const InfoTileWithSliderBlock = (props: InfoTileWithSliderProps) => {
  const { blockTitle, infoTile, slides } = props

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <BlockContainer title={blockTitle} className="info-tile-with-slider">
      <div className="flex flex-col lg:flex-row gap-5 pb-13">
        <div className="shrink-0 w-full lg:w-2/5 bg-tint rounded-3xl p-6">
          <p className="h-1.5xl text-lb">{infoTile.title}</p>
          {infoTile.text && <p className="p-md text-lb mt-3">{infoTile.text}</p>}

          <CMSLink {...infoTile.link} size="smallToDefault" appearance="primary" className="mt-4" />
        </div>

        <div className="shrink-0 w-full lg:w-3/5 relative">
          <div className="embla h-full">
            <div className="embla__viewport h-full lg:overflow-hidden" ref={emblaRef}>
              <div
                className="embla__container h-full"
                // slide-width is set in globals.css
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="embla__slide">
                    <Slide {...slide} />
                  </div>
                ))}
              </div>
            </div>

            <div className="embla__controls absolute bottom-0 translate-y-full right-0 pt-4">
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
        </div>
      </div>
    </BlockContainer>
  )
}

const Slide = ({ title, text, link }: SlideType) => {
  return (
    <div className="size-full bg-white rounded-3xl p-6">
      <p className="h-1.5xl">{title}</p>
      {text && <p className="p-base sm:p-md text-lb mt-3">{text}</p>}

      <CMSLink {...link} size="smallToDefault" appearance="primary" className="mt-5" />
    </div>
  )
}
