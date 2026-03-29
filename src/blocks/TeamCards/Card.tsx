import type { TeamCardsBlock } from '@/payload-types'

import { ImageMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'
import Contact from '@/components/Contact'

type CardType = React.FC<{
  data: NonNullable<TeamCardsBlock['cards']>[0]
  className?: string
}>

const Card: CardType = ({ data, className }) => {
  const { photo, fullName, description, contacts } = data

  return (
    <article className={cn('flex flex-col bg-white rounded-[20px] overflow-hidden', className)}>
      <ImageMedia
        resource={photo}
        size="320px"
        className="w-full aspect-square rounded-[20px] object-cover overflow-hidden"
      />

      <div className="flex flex-col grow p-5">
        <p className="p-base text-[17px] font-medium">{fullName}</p>
        <p className="p-sm font-normal mt-2">{description}</p>

        {contacts && contacts.length > 0 && (
          <div className="pt-3 mt-auto">
            <p className="font-sm font-medium mb-0.5">Контакты</p>

            <div className="flex flex-col items-start gap-0.5">
              {contacts?.map((contact) => (
                <Contact key={contact.id} data={contact} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default Card
