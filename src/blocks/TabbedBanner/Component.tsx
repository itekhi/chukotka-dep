'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { TabberBannerBlock as TabberBannerProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import RichText from '@/components/RichText'
import { ImageMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

type TabsType = TabberBannerProps['tabs']

export const TabbedBannerBlock = ({ blockTitle, tabs }: TabberBannerProps) => {
  return (
    <BlockContainer title={blockTitle}>
      <DesktopTabbedBanner tabs={tabs} className="hidden lg:flex" />
      <MobileTabbedBanner tabs={tabs} className="lg:hidden" />
    </BlockContainer>
  )
}

const DesktopTabbedBanner = ({ tabs, className }: { tabs: TabsType; className?: string }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)

  return (
    <div className={cn('flex items-stretch gap-7', className)}>
      <div className="w-1/2 flex flex-col gap-4">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            variants={{
              normal: {
                backgroundColor: '#ffffff',
                scale: 1,
                boxShadow: '0 0px 0px -8px rgba(0,0,0,0)',
              },
              active: {
                backgroundColor: '#e8e9f7',
                scale: 1.03,
                boxShadow: '0 7px 15px -3px rgba(0,0,0,0.1)',
              },
            }}
            initial="normal"
            animate={tab.id === activeTabId ? 'active' : 'normal'}
            className={cn(
              'grow flex items-center rounded-3xl shadow-lg cursor-pointer py-5 px-7',
              tab.id === activeTabId && 'pointer-events-none',
            )}
            onClick={() => setActiveTabId(tab.id)}
          >
            <p className="h-xl">{tab.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="w-1/2 relative">
        <AnimatePresence>
          {tabs.map(
            (tab) =>
              tab.id === activeTabId && (
                <motion.div
                  key={tab.id}
                  initial={{ position: 'relative', opacity: 0 }}
                  animate={{ position: 'relative', opacity: 1 }}
                  exit={{ position: 'absolute', inset: 0, opacity: 0 }}
                  className={cn(
                    'w-full h-86 rounded-4xl overflow-hidden',
                    tab.withGradient ? 'bg-gradient-primary' : 'bg-gray-light',
                  )}
                >
                  <ImageMedia
                    resource={tab.image}
                    className="size-full absolute inset-0 z-10 object-cover object-center"
                  />
                  {tab.objectImagePlacement === 'squezeRight' && (
                    <ImageMedia
                      resource={tab.objectImage}
                      className="w-44 xl:w-64 h-auto absolute bottom-0 right-0 z-20"
                    />
                  )}

                  <div className="flex flex-col justify-between size-full p-7">
                    <RichText
                      data={tab.richText}
                      sizing={tab.richTextSize}
                      className={cn(
                        'relative z-30',
                        tab.textColor === 'darkblue' && 'text-primary-muted',
                      )}
                    />

                    {tab.objectImagePlacement === 'bottomCenter' && (
                      <div className="grow w-full relative xl:mt-3 -mb-7">
                        <ImageMedia
                          resource={tab.objectImage}
                          className="max-h-72 w-auto h-full absolute bottom-0 left-1/2 -translate-x-1/2"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const MobileTabbedBanner = ({ tabs, className }: { tabs: TabsType; className?: string }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {tabs.map((tab) => (
        <div key={tab.id} className="flex flex-col rounded-3xl overflow-hidden">
          <div
            className={cn(
              'w-full p-6 relative transition-colors',
              tab.id === activeTabId ? 'bg-tint' : 'bg-white',
            )}
            onClick={() => setActiveTabId(tab.id)}
          >
            <p className="h-xl relative z-20">{tab.name}</p>
          </div>

          <motion.div
            variants={{
              closed: { height: 0, opacity: 0 },
              open: { height: 'auto', opacity: 1 },
            }}
            initial={tab.id === activeTabId ? 'open' : 'closed'}
            animate={tab.id === activeTabId ? 'open' : 'closed'}
            className={cn(
              'rounded-b-3xl overflow-hidden relative',
              tab.withGradient ? 'bg-gradient-primary' : 'bg-white',
            )}
          >
            <ImageMedia
              resource={tab.image}
              className="size-full absolute inset-0 z-10 object-cover object-center opacity-40 blur-xs"
            />

            <div className="flex flex-col">
              <RichText
                data={tab.richText}
                className={cn(
                  'relative z-30 p-6',
                  tab.textColor === 'darkblue' && 'text-primary-muted',
                )}
              />

              {!tab.hideObjectImageOnMobile && (
                <ImageMedia resource={tab.objectImage} className="self-center h-40 w-auto -mt-3" />
              )}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
