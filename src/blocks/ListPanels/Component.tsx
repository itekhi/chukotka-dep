import type { ListPanelsBlock as ListPanelsProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { ListPanel } from '../ListPanel'

export const ListPanelsBlock = ({ blockTitle, firstPanel, secondPanel }: ListPanelsProps) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="flex flex-col lg:flex-row gap-5">
        <ListPanel panel={firstPanel || {}} className="lg:w-1/2" />

        <ListPanel panel={secondPanel || {}} className="lg:w-1/2" />
      </div>
    </BlockContainer>
  )
}
