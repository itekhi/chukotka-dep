'use client'

import { useState } from 'react'
import type { TabbedTilesGridBlock } from '@/payload-types'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/utilities/ui'
import { ImageMedia } from '@/components/Media'

type TabType = TabbedTilesGridBlock['tabs'][0]

export const TilesGridTabs = ({ tabs }: { tabs: TabType[] }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)

  return (
    <div className="bg-gray-light rounded-4xl p-5 sm:p-7">
      <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-0 w-full mb-6">
        {tabs.map(({ id, tabName }) => (
          <button
            key={id}
            type="button"
            className={cn(
              'text-center px-3 lg:px-8 py-4 rounded-1.5xl lg:first:rounded-r-none lg:last:rounded-l-none transition-colors',
              id === activeTabId
                ? 'bg-white pointer-events-none text-black'
                : 'bg-white/40 text-black/70 hover:text-black',
            )}
            onClick={() => setActiveTabId(id)}
          >
            <p className="h-base md:h-xl">{tabName}</p>
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence>
          {tabs.map(
            (tab) =>
              tab.id === activeTabId && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0 }}
                  animate={{ position: 'relative', opacity: 1 }}
                  exit={{ position: 'absolute', inset: 0, opacity: 0 }}
                >
                  <TabContent {...tab} />
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const TabContent = ({ withNumbering, tiles }: TabType) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 w-full">
      {tiles.map((tile, index) => (
        <div
          key={tile.id}
          className={cn(
            'flex justify-between gap-5 p-5 bg-white rounded-2.5xl',
            index <= 2
              ? 'flex-col sm:flex-row lg:flex-col lg:col-span-2'
              : 'flex-col sm:flex-row lg:col-span-3',
          )}
        >
          <div className="flex flex-col w-full gap-3">
            {withNumbering && <span className="h-1.5xl">{String(index + 1).padStart(2, '0')}</span>}

            <p className="h-base text-lb">{tile.text}</p>
          </div>

          <ImageMedia resource={tile.image} className="self-center w-auto h-32 lg:h-36 xl:h-44" />
        </div>
      ))}
    </div>
  )
}
