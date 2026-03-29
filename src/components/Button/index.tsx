import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap',
    'transition-[background-color] disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    'ring-ring/10 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0',
  ),
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary-muted text-white',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        clear: '',
        default: 'p-btn h-12 pt-px px-9 rounded-xl',
        smallToDefault:
          'p-btn-sm md:p-btn h-9 md:h-12 pt-0.5 md:pt-px px-6 md:px-9 rounded-0.5xl md:rounded-xl',
        // sm: 'h-9 rounded-md px-3 has-[>svg]:px-2.5',
        // lg: 'h-11 rounded-md px-8 has-[>svg]:px-4',
        // icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn('', buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
