import { CollapsibleBlocksBlock as CollapsibleBlocksProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { CMSLink } from '@/components/Link'
import Collapsible from '@/components/Collapsible'
import { RenderBlock } from './RenderBlock'

const overflowingBlocks = ['content', 'banner']

export const CollapsibleBlocksBlock = ({
  blockTitle,
  blockLink,
  sections,
}: CollapsibleBlocksProps) => {
  return (
    <BlockContainer
      title={blockTitle}
      onTitleRight={
        blockLink.type !== 'off' && (
          <CMSLink {...blockLink} size="smallToDefault" appearance="primary" />
        )
      }
    >
      {sections.map(({ id, title, titleSize, subtitle, block }, index) => (
        <Collapsible
          key={id}
          title={title}
          titleSize={titleSize}
          subtitle={subtitle}
          className={index !== 0 ? '-mt-0.5' : ''}
          containerOverflowHidden={overflowingBlocks.includes(block[0].blockType)}
        >
          <RenderBlock block={block[0]} />
        </Collapsible>
      ))}
    </BlockContainer>
  )
}
