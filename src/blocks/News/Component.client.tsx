'use client'

import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence } from 'motion/react'

import { News as NewsType } from '@/payload-types'

import NewsCard from '@/components/NewsCard'
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/CarouselArrows'

import { NewsModal } from './NewsModal.client'
import { NewsPanel } from './NewsPanel.client'

export default function ClientNewsBlock({ news }: { news: NewsType[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  const [isModalOpen, setModalOpen] = useState(false)
  const [openNewsIndex, setOpenNewsIndex] = useState<number>(0)
  const [newsDirection, setNewsDirection] = useState<number>(0)
  // const [currentIndex, setCurrentIndex] = useState(0)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  // const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const openModal = (idx: number) => {
    // alert('OPEN NEWS MODAL')
    setModalOpen(true)
    setOpenNewsIndex(idx)
    setNewsDirection(0)
  }

  const closeModal = () => setModalOpen(false)

  const goNext = () => {
    setNewsDirection(1)
    setTimeout(() => setOpenNewsIndex((prev) => (prev + 1) % news.length), 50)
  }

  const goPrev = () => {
    setNewsDirection(-1)
    setTimeout(() => setOpenNewsIndex((prev) => (prev - 1 + news.length) % news.length), 50)
  }

  const current = news[openNewsIndex]

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div
            className="embla__container"
            // @ts-expect-error ...
            style={{ '--slide-width': '19.55rem' }}
          >
            {news?.map(({ id, title, shortDescription, publishedAt }, idx) => (
              <div key={id} className="embla__slide">
                <NewsCard
                  data={{ title, text: shortDescription, publishedAt }}
                  onClick={() => openModal(idx)}
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

      <AnimatePresence>
        {isModalOpen && current && (
          <NewsModal onClick={closeModal}>
            <AnimatePresence>
              <NewsPanel
                key={current.id}
                data={current}
                direction={newsDirection}
                onClose={closeModal}
                onPrev={goPrev}
                onNext={goNext}
              />
            </AnimatePresence>
          </NewsModal>
        )}
      </AnimatePresence>
    </>
  )
}
