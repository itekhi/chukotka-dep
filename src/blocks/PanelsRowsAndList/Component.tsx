import type { PanelsRowsAndListBlock as PanelsRowsAndListProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { ListPanel } from '../ListPanel'
import { ImageMedia, isMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

const titleClassName = 'h-lg md:h-1.5xl mb-3'

export const PanelsRowsAndListBlock = (props: PanelsRowsAndListProps) => {
  const {
    blockTitle,
    panelsTitle,
    panels,
    rowsTitle,
    rows,
    listTitle,
    list,
    enableSpecialRow,
    specialRow,
  } = props

  return (
    <BlockContainer title={blockTitle}>
      <div className="w-full">
        {panelsTitle && <p className={titleClassName}>{panelsTitle}</p>}

        <div
          className="grid grid-cols-1 lg:grid-cols-(--cols) gap-4"
          // @ts-expect-error ...
          style={{ '--cols': `repeat(${panels.length}, minmax(0, 1fr))` }}
        >
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="flex flex-row lg:flex-col items-center justify-between gap-4 bg-white rounded-3xl pr-0 sm:pr-6 p-6"
            >
              <p className="p-base sm:p-md">{panel.text}</p>

              <ImageMedia
                resource={panel.image}
                className="w-auto h-20 sm:h-28 object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-7 mt-8">
        <div className="flex flex-col w-full lg:w-1/2">
          {rowsTitle && <p className={titleClassName}>{rowsTitle}</p>}

          <div className="grow flex flex-col sm:flex-row lg:flex-col gap-4">
            {rows.map((row, index) => (
              <div
                key={row.id}
                className={cn(
                  'w-full sm:w-1/2 lg:w-full lg:grow flex flex-col gap-2 bg-white rounded-3xl p-5',
                  index % 2 === 0 ? 'bg-tint' : 'bg-white',
                )}
              >
                <p className="text-[32px] sm:text-[40px] font-medium leading-none">
                  {row.bigNumber}
                </p>
                <p className="p-base lg:text-lb">{row.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2">
          {listTitle && <p className={titleClassName}>{listTitle}</p>}

          <ListPanel
            panel={{ rows: list, withNumbering: true }}
            extraRow={
              enableSpecialRow &&
              specialRow && (
                <div
                  className={cn(
                    'flex items-center p-5 rounded-2xl relative',
                    specialRow.withGradient ? 'bg-gradient-primary' : 'bg-tint',
                    isMedia(specialRow.icon) && 'pl-15',
                  )}
                >
                  <div className="flex items-center gap-3">
                    {isMedia(specialRow.icon) && (
                      <ImageMedia
                        resource={specialRow.icon}
                        className="w-auto h-11 object-center absolute top-4 left-3"
                      />
                    )}

                    <div>
                      <p className="p-sm md:p-base xl:text-lb mt-px">{specialRow.text}</p>
                    </div>
                  </div>
                </div>
              )
            }
            className="grow"
          />
        </div>
      </div>
    </BlockContainer>
  )
}
