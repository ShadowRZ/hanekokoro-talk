import clsx from 'clsx'
import { ComponentChildren, JSX } from 'preact'

interface ButtonProps {
  onClick: any
  children: ComponentChildren
  className?: string
}

export function Button ({ onClick, children, className, ...other }: ButtonProps): JSX.Element {
  return (
    <button
      type='button'
      className={
        clsx(
          'transition duration-200 inline-flex justify-center rounded-md border border-transparent',
          'px-4 py-2 text-sm font-medium bg-orange-600/25 hover:bg-orange-600/75',
          'text-orange-700 hover:text-orange-50',
          className
        )
      }
      {...other}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
