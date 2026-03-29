'use client'

import type { OrganizationsBlock } from '@/payload-types'

import Contact from '@/components/Contact'
import { ImageMedia } from '@/components/Media'
import useClickableCard from '@/utilities/useClickableCard'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type OrganizationType = NonNullable<OrganizationsBlock['organizations']>[0]

type Props = { data: OrganizationType; variant: 'horizontal' | 'vertical'; className?: string }

const OrganizationTile = ({ data, variant, className }: Props) => {
  const { title, description, contacts, link } = data

  const { cardRef, linkRef } = useClickableCard<HTMLDivElement>({ newTab: link.newTab ?? true })

  return (
    <div
      ref={cardRef}
      className={cn(
        'flex gap-7 p-6 xl:p-7 text-dark bg-linear-287 from-tint to-tint/50 rounded-4xl cursor-pointer',
        variant === 'vertical' ? 'min-w-78 flex-col' : '',
        'hover:scale-[102%] hover:shadow-lg/80 shadow-indigo-950/8 transition-all',
        className,
      )}
    >
      <ImageMedia
        resource={data.logo}
        className={cn(
          variant === 'vertical'
            ? 'w-full aspect-[1.4/1] object-cover'
            : 'w-42 h-36 lg:w-38 lg:h-38 xl:size-40 object-contain',
          'shrink-0 rounded-1.5xl overflow-hidden bg-white',
        )}
      />

      <div className="flex flex-col gap-2.5">
        <CMSLink {...link} ref={linkRef}>
          <p className="h-1.5xl">{title}</p>
        </CMSLink>
        <p className="p-base">{description}</p>

        <div className="flex flex-col items-start gap-0.5 mt-1.5">
          {contacts?.map((contact) => (
            <Contact key={contact.id} data={contact} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrganizationTile
