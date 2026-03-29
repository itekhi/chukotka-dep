import { slugify } from '@/fields/slug'
import { cn } from '@/utilities/ui'

type Props = {
  title?: string | null | undefined
  onTitleRight?: React.ReactNode
  className?: string
  titleClassName?: string
  titleContainerClassName?: string
  idFrom?: string | null | undefined
  noContainer?: boolean
  children: React.ReactNode
}

export default function BlockContainer({
  title,
  onTitleRight,
  className,
  titleClassName,
  titleContainerClassName,
  idFrom,
  noContainer = false,
  children,
}: Props) {
  const id = slugify(idFrom ?? title ?? '')

  return (
    <div
      id={id}
      className={cn('scroll-mt-7 lg:scroll-mt-9', !noContainer && 'container', className)}
    >
      {title && (
        <BlockTitle
          title={title}
          onRight={onTitleRight}
          className={titleClassName}
          containerClassName={cn('mb-9 md:mb-11 xl:mb-13', titleContainerClassName)}
        />
      )}

      {children}
    </div>
  )
}

type BlockTitleProps = {
  title: string
  onRight?: React.ReactNode
  className?: string
  containerClassName?: string
}

export const BlockTitle = ({ title, onRight, className, containerClassName }: BlockTitleProps) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12',
        containerClassName,
      )}
    >
      <h2 className={cn('block-title-large subline', className)}>{title}</h2>
      {onRight}
    </div>
  )
}
