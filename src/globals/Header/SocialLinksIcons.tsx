import type { Header } from '@/payload-types'

export const getSocialIcon = (type: string) => {
  if (type === 'telegram') return '/assets/tg-icon.svg'
  if (type === 'vk') return '/assets/vk-icon.svg'
}

type Type = React.FC<{ socialLinks: NonNullable<Header['socialLinks']> }>

export const SocialLinksIcons: Type = ({ socialLinks }) => {
  return socialLinks?.map((social) => (
    <a key={social.id} href={social.url} className="size-10 hover:scale-105 transition-transform">
      {/* eslint-disable @next/next/no-img-element */}
      <img src={getSocialIcon(social.type)} alt={social.type} className="size-full" />
    </a>
  ))
}
