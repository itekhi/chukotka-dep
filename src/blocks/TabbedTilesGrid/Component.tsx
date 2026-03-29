import { TabbedTilesGridBlock as TabbedTilesGridProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'

import { TilesGridTabs } from './Tabs.client'

export const TabbedTilesGridBlock = ({ blockTitle, tabs }: TabbedTilesGridProps) => {
  return (
    <BlockContainer title={blockTitle}>
      <TilesGridTabs tabs={tabs} />
    </BlockContainer>
  )
}
