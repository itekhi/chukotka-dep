import { motion } from 'framer-motion'
import type { News as NewsType } from '@/payload-types'

import ArrowButton from '@/components/ArrowButton'
import RichText from '@/components/RichText'
import { formatRussianDate } from '@/utilities/formatDateTime'

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '100%' : dir > 0 ? '-100%' : 0, opacity: 0 }),
}

interface NewsPanelProps {
  data: NewsType
  direction: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export const NewsPanel = ({ data, direction, onClose, onPrev, onNext }: NewsPanelProps) => {
  const { title, shortDescription, content, publishedAt } = data

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'tween' }}
      className="absolute inset-0 flex-centered w-full min-w-screen px-3 sm:px-8 md:px-10 py-5 sm:py-14 md:py-18"
    >
      <div
        className="flex flex-col max-w-full w-272 h-full p-7 sm:p-8 md:p-12 bg-white rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ArrowButton htmlElement="button" direction="left" onClick={onPrev} />
            <ArrowButton htmlElement="button" direction="right" onClick={onNext} />

            <p className="p-sm">Следующая новость</p>
          </div>

          <button type="button" onClick={onClose}>
            {/* prettier-ignore */}
            <svg className="size-6" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.3966 2.37508C20.7871 1.98455 20.7871 1.35139 20.3966 0.960862C20.0061 0.570338 19.3729 0.570338 18.9824 0.960862L10.9288 9.01443L2.87525 0.960862C2.48472 0.570338 1.85156 0.570338 1.46103 0.960862C1.07051 1.35139 1.07051 1.98455 1.46103 2.37508L9.51461 10.4286L1.46037 18.4829C1.06985 18.8734 1.06985 19.5066 1.46037 19.8971C1.8509 20.2876 2.48406 20.2876 2.87459 19.8971L10.9288 11.8429L18.9831 19.8971C19.3736 20.2876 20.0067 20.2876 20.3973 19.8971C20.7878 19.5066 20.7878 18.8734 20.3973 18.4829L12.343 10.4286L20.3966 2.37508Z" fill="#1C5A96" />
            </svg>
          </button>
        </div>

        <div className="grow w-full mt-5 sm:mt-7 pt-2 pb-5 sm:pb-7 overflow-auto">
          <h1 className="h-lg sm:h-2xl lg:h-3xl leading-[1.15]">{title}</h1>

          <p className="p-base sm:p-md leading-tight mt-5">{shortDescription}</p>

          <hr className="my-5 md:my-7" />

          <RichText data={content} sizing="base-to-md" />
        </div>

        <div className="p-base sm:p-md text-gray-500 border-t pt-4 sm:pt-6">
          Дата публикации: {formatRussianDate(publishedAt)}
        </div>
      </div>
    </motion.div>
  )
}
