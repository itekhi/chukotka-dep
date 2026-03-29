import { CMSLink, CMSLinkType } from '../Link'
import { formatDateTime, formatRussianDate } from '@/utilities/formatDateTime'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import { forwardRef } from 'react'

type Props = {
  data: {
    title: string
    text?: string | null
    link?: CMSLinkType | null | undefined
    publishedAt?: string | null
  }
  onClick?: () => void
  textLineClamp?: boolean
  titleSize?: 'normal' | 'small'
  shortDateFormat?: boolean
  className?: string
}

type TitleProps = { title: string; link: Props['data']['link']; className: string }

const TitleComponent: React.ForwardRefRenderFunction<any, TitleProps> = (props, ref) => {
  const { title, link, className } = props

  if (link) {
    return (
      <CMSLink ref={ref} {...link} label={null} className={className}>
        {title}
      </CMSLink>
    )
  } else {
    return (
      <p ref={ref} className={className}>
        {title}
      </p>
    )
  }
}

const Title = forwardRef(TitleComponent)

export default function NewsCard(props: Props) {
  const {
    data: { title, text, link, publishedAt },
    onClick,
    textLineClamp = true,
    titleSize = 'normal',
    shortDateFormat,
    className,
  } = props

  const { cardRef, linkRef } = useClickableCard<HTMLDivElement>({ newTab: link?.newTab ?? false })

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={cn(
        'group w-full flex flex-col p-6 rounded-2.5xl cursor-pointer',
        'border-2 border-tint hover:border-primary hover:bg-primary transition-[background-color,border-color]',
        '[&>a,p,span]:text-primary-muted [&>a,p,span]:group-hover:text-white [&>a,p,span]:transition-colors',
        className,
      )}
    >
      <Title
        ref={linkRef}
        title={title}
        link={link}
        className={cn(
          titleSize === 'small' ? 'p-base' : 'p-md',
          'font-medium leading-[1.2] mb-3 line-clamp-3',
        )}
      />

      {text && <p className={cn('p-sm leading-[1.2]', textLineClamp && 'line-clamp-3')}>{text}</p>}

      <div className="flex justify-between items-end pt-5.5 mt-auto p-sm">
        <span className="underline normal-case">{link?.label ?? 'Подробнее'}</span>

        {publishedAt && (
          <span>
            {shortDateFormat ? formatDateTime(publishedAt) : formatRussianDate(publishedAt)}
          </span>
        )}
      </div>
    </div>
  )
}
