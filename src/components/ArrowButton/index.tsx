import { cn } from '@/utilities/ui'
import { createElement, HTMLElementType } from 'react'

type Props = {
  direction: 'left' | 'right'
  htmlElement?: HTMLElementType
  onClick?: () => void
  className?: string
}

export default function ArrowButton({
  direction,
  className,
  htmlElement = 'button',
  ...props
}: Props) {
  return createElement(
    htmlElement,
    {
      type: htmlElement === 'button' ? 'button' : '',
      className: cn('arrow-btn', className),
      ...props,
    },
    <Icon direction={direction} />,
  )
}

const Icon = ({ direction, ...props }: { direction: 'left' | 'right' }) => {
  if (direction === 'left') {
    return (
      /* prettier-ignore */
      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M2.13565 7.50006L8.28212 1.35359L7.57501 0.646484L0.503945 7.71755L0.150391 8.0711L0.503945 8.42466L7.57501 15.4958L8.28212 14.7887L1.99356 8.50006H14.9996V7.50006H2.13565Z" />
      </svg>
    )
  } else {
    /* prettier-ignore */
    return (
      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M12.8643 8.49994L6.71788 14.6464L7.42499 15.3535L14.4961 8.28245L14.8496 7.9289L14.4961 7.57534L7.42499 0.504241L6.71788 1.21134L13.0064 7.49994L0.000367877 7.49994L0.000367964 8.49994L12.8643 8.49994Z" />
      </svg>
    )
  }
}
