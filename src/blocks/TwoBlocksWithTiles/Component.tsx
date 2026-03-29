import type { TwoPanelsWithTilesBlock as TwoPanelsWithTilesProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import { ImageMedia } from '@/components/Media'
import RichText from '@/components/RichText'
import Collapsible from '@/components/Collapsible'
import { cn } from '@/utilities/ui'

type PanelType = TwoPanelsWithTilesProps['panel1'] | TwoPanelsWithTilesProps['panel2']

/* Container/Wrapper (either collapsible or not) */

type ContainerProps = { title: string; collapsible: boolean; children: React.ReactNode }

const Container = ({ title, collapsible, children }: ContainerProps) => {
  if (collapsible) {
    return (
      <BlockContainer idFrom={title}>
        <Collapsible title={title}>{children}</Collapsible>
      </BlockContainer>
    )
  } else {
    return <BlockContainer title={title}>{children}</BlockContainer>
  }
}

/* Component */

export const TwoPanelsWithTilesBlock: React.FC<TwoPanelsWithTilesProps> = (props) => {
  const { blockTitle, panel1, panel2, tiles, tilesTitle, collapsible } = props

  return (
    <Container title={blockTitle || ''} collapsible={collapsible ?? false}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel panel={panel1} className="bg-white" />

        <Panel panel={panel2} className="bg-tint" />
      </div>

      {(tiles?.length || 0) > 0 && (
        <div className="mt-8">
          {tilesTitle && <p className="h-1.5xl">{tilesTitle}</p>}

          <div className="off-container flex gap-3.5 overflow-auto mt-5">
            {tiles?.map((tile) => (
              <div key={tile.id} className="flex-1 min-w-60 bg-white rounded-2xl p-5">
                <ImageMedia resource={tile.icon} className="size-6.5 mb-3" />
                <p className="p-base font-medium leading-[1.2]">{tile.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}

const Panel = ({ panel, className }: { panel: PanelType; className?: string }) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row lg:flex-col xl:flex-row bg-tint rounded-2xl p-6',
        className,
      )}
    >
      <RichText
        data={panel.richText}
        sizing="sm-to-base"
        className="mb-6 sm:mb-0 lg:mb-5 xl:mb-0"
      />

      <ImageMedia
        resource={panel.image}
        className="shrink-0 self-center w-52 sm:w-60 object-contain object-center lg:mt-auto xl:mt-0 xl:-mr-3"
      />
    </div>
  )
}
