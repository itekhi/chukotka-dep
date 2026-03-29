import type { OrganizationsBlock as OrganizationsBlockProps } from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import OrganizationTile from './OrganizationTile'

type Props = {
  className?: string
} & OrganizationsBlockProps

export const OrganizationsBlock: React.FC<Props> = ({ blockTitle, organizations }) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-8">
        {organizations?.map((org) => (
          <OrganizationTile key={org.id} data={org} variant="horizontal" />
        ))}
      </div>

      <div className="off-container flex md:hidden gap-5 overflow-scroll snap-x snap-mandatory">
        {organizations?.map((org) => (
          <OrganizationTile key={org.id} data={org} variant="vertical" className="snap-start" />
        ))}
      </div>
    </BlockContainer>
  )
}
