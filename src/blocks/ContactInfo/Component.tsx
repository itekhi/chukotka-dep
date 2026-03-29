import Image from 'next/image'
import { ContactInfoBlock as ContactInfoProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { ImageMedia } from '@/components/Media'

type ContactType = ContactInfoProps['contacts'][0]

export const ContactInfoBlock = ({ blockTitle, title, contacts }: ContactInfoProps) => {
  return (
    <BlockContainer title={blockTitle}>
      <div className="flex justify-start">
        <div className="flex items-center w-full sm:w-auto md:min-w-160 gap-4 md:gap-9 p-7 bg-gray-light rounded-3xl">
          <div className="flex flex-col gap-2.5">
            <p className="h-lg sm:text-lb mb-2">{title}</p>

            {contacts
              .filter((c) => c.type !== 'qr')
              .map((contact) => (
                <Contact key={contact.id} {...contact} />
              ))}
          </div>

          <div className="hidden sm:flex items-end gap-4 h-full">
            {contacts
              .filter((c) => c.type === 'qr')
              .map((contact) => (
                <QRContact key={contact.id} {...contact} />
              ))}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}

const linkProps = { target: '_blank', rel: 'noreferrer noopener' }

const Contact = ({ type, value, url }: ContactType) => {
  const href = url || contactUrl(type, value)
  const Comp = href ? 'a' : 'p'
  const props = href ? { href, ...linkProps } : {}

  return (
    <Comp
      {...props}
      className="flex items-center gap-2.5 [a]:hover:text-primary-muted [&:is(a):hover>span]:ml-1 transition-colors"
    >
      <Image src={contactIcon(type)} alt="" width={20} height={20} className="size-5" />
      <span className="p-base transition-[margin]">{value}</span>
    </Comp>
  )
}

const QRContact = ({ qr, url }: ContactType) => {
  const Comp = url ? 'a' : 'div'
  const props = url ? { href: url, ...linkProps } : {}

  return (
    <Comp {...props}>
      <ImageMedia resource={qr} className="w-auto max-h-32" />
    </Comp>
  )
}

const contactUrl = (type: ContactType['type'], value: ContactType['value']) => {
  if (!value) return
  if (type === 'phone') return `tel:+${value?.replace(/\D+/g, '')}`
  if (type === 'email') return `mailto:${value?.replace('[ ]+', '')}`
  if (type === 'vk') return `https://vk.ru/${value}`
  if (type === 'telegram') return `https://t.me/${value}`
}

const contactIcon = (type: ContactType['type']) => {
  if (type === 'phone') return '/assets/phone-icon-alt.svg'
  if (type === 'email') return '/assets/email-icon-alt.svg'
  if (type === 'address') return '/assets/map-pin-icon-alt.svg'
  if (type === 'vk') return '/assets/vk-icon-simple.svg'
  if (type === 'telegram') return '/assets/tg-icon-simple.svg'
  return ''
}
