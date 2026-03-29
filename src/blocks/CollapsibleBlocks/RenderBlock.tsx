import { CollapsibleBlocksBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'

import { ContentBlock } from './blocks/ContentBlock'
import { SubSectionsBlock } from './blocks/SubSectionsBlock'
import { NewsCardsBlock } from './blocks/NewsCardsBlock'
import { BannerBlock } from './blocks/Banner'
import { InfoCardsBlock } from './blocks/InfoCards'
import { BannersGridBlock } from './blocks/BannersGrid'

type BlockType = CollapsibleBlocksBlock['sections'][0]['block'][0]

const blockComponents = {
  content: ContentBlock,
  subSections: SubSectionsBlock,
  newsCards: NewsCardsBlock,
  banner: BannerBlock,
  infoCards: InfoCardsBlock,
  bannersGrid: BannersGridBlock,
}

export const RenderBlock: React.FC<{ block: BlockType }> = ({ block }) => {
  if (block) {
    const { blockType } = block

    if (blockType && blockType in blockComponents) {
      const Block = blockComponents[blockType]

      if (Block) {
        return (
          /* @ts-expect-error there might be some differences... */
          <Block {...block} />
        )
      }
    }
  }

  return null
}
