import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { cn } from '@/utilities/ui'
// import { CallToActionBlock } from '@/blocks/CallToAction/Component'
// import { ContentBlock } from '@/blocks/Content/Component'
// import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroBannerBlock } from './HeroBanner/Component'
import { BannerBlock } from './Banner/Component'
import { NavCardsBlock } from './NavCards/Component'
import { TeamCardsBlock } from './TeamCards/Component'
import { OrganizationsBlock } from './Organizations/Component'
import { UsefulResourcesBlock } from './UsefulResources/Component'
import { DocumentsBlock } from './Documents/Component'
import { NewsBlock } from './News/Component'
import { BigTilesBlock } from './BigTiles/Component'
import { ListPanelsBlock } from './ListPanels/Component'
import { ListPanelWithBannerBlock } from './ListPanelWithBanner/Component'
import { ListPanelWith2TilesBlock } from './ListPanelWith2Tiles/Component'
import { TwoPanelsWithTilesBlock } from './TwoBlocksWithTiles/Component'
import { PanelsRowsAndListBlock } from './PanelsRowsAndList/Component'
import { TabbedBannerBlock } from './TabbedBanner/Component'
import { TilesGridBlock } from './TilesGrid/Component'
import { CollapsibleBlocksBlock } from './CollapsibleBlocks/Component'
import { BannersGridBlock } from './BannersGrid/Component'
import { ContactInfoBlock } from './ContactInfo/Component'
import { InfoTilesBlock } from './InfoTiles/Component'
import { MediaCardsBlock } from './MediaCards/Component'
import { ContentTilesBlock } from './ContentTiles/Component'
import { InfoTileWithSliderBlock } from './InfoTileWithSlider/Component'
import { TabbedTilesGridBlock } from './TabbedTilesGrid/Component'
import { InfoCardsBlock } from './InfoCards/Component'
import { InformationBlock } from './Information/Component'
import { LinkCardsGridBlock } from './LinkCardsGrid/Component'
import { AllDocumentsBlock } from './AllDocuments/Component'
import { HeadingBlock } from './Heading/Component'

const blockComponents = {
  heroBanner: HeroBannerBlock,
  banner: BannerBlock,
  navCards: NavCardsBlock,
  teamCards: TeamCardsBlock,
  organizations: OrganizationsBlock,
  usefulResources: UsefulResourcesBlock,
  documents: DocumentsBlock,
  news: NewsBlock,
  bigTiles: BigTilesBlock,
  twoPanelsWithTiles: TwoPanelsWithTilesBlock,
  listPanels: ListPanelsBlock,
  listPanelWithBanner: ListPanelWithBannerBlock,
  listPanelWith2Tiles: ListPanelWith2TilesBlock,
  panelsRowsAndList: PanelsRowsAndListBlock,
  tabbedBanner: TabbedBannerBlock,
  tilesGrid: TilesGridBlock,
  collapsibleBlocks: CollapsibleBlocksBlock,
  bannersGrid: BannersGridBlock,
  contactInfo: ContactInfoBlock,
  infoTiles: InfoTilesBlock,
  mediaCards: MediaCardsBlock,
  contentTiles: ContentTilesBlock,
  infoTileWithSlider: InfoTileWithSliderBlock,
  tabbedTilesGrid: TabbedTilesGridBlock,
  infoCards: InfoCardsBlock,
  information: InformationBlock,
  linkCardsGrid: LinkCardsGridBlock,
  allDocuments: AllDocumentsBlock,
  heading: HeadingBlock,
}

const overflowingBlocks = [
  'navCards',
  'teamCards',
  'news',
  'twoPanelsWithTiles',
  'collapsibleBlocks',
  'mediaCards',
  'infoTileWithSlider',
  'infoCards',
]

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { id, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div
                  key={id}
                  className={cn(
                    'my-12 md:my-14 lg:my-16 first:mt-0',
                    overflowingBlocks.includes(blockType) && 'overflow-hidden',
                  )}
                >
                  {/* @ts-expect-error there might be some differences... */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
