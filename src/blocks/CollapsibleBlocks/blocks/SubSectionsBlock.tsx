import { CollapsibleBlocksSubSectionsBlock } from '@/payload-types'

import RichText from '@/components/RichText'
import Collapsible from '@/components/Collapsible'

export const SubSectionsBlock = ({ subSections }: CollapsibleBlocksSubSectionsBlock) => {
  return (
    <div className="h-full pb-2 md:pb-4 overflow-hidden">
      {subSections.map(({ id, title, richText }, index) => (
        <Collapsible
          key={id}
          title={title}
          titleSize="normal"
          titleElement="h3"
          className={index !== 0 ? '-mt-0.5' : ''}
          containerOverflowHidden={true}
        >
          <RichText data={richText} withBrDisabler={false} />
        </Collapsible>
      ))}
    </div>
  )
}
