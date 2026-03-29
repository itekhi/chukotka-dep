import { CollapsibleBlocksContentBlock } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const ContentBlock = ({ richText, link }: CollapsibleBlocksContentBlock) => {
  return (
    <div className="pb-2 md:pb-4">
      <RichText data={richText} withBrDisabler={false} />

      {link && link.type !== 'off' && (
        <center className="mt-4">
          <CMSLink {...link} appearance="primary" />
        </center>
      )}
    </div>
  )
}
