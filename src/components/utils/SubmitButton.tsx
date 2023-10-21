import clsx from 'clsx'
import { JSX } from 'preact'

interface SubmitButtonProps {
  value: string
  className?: string
}

export function SubmitButton ({ value, className, ...other }: SubmitButtonProps): JSX.Element {
  return (
    <input
      type='submit'
      className={
        clsx(
          'transition duration-200 inline-flex justify-center rounded-md border border-transparent hover:cursor-pointer',
          'px-4 py-2 text-sm font-medium bg-orange-600/25 hover:bg-orange-600/75',
          'text-orange-700 hover:text-orange-50',
          className
        )
      }
      {...other}
      value={value}
    />
  )
}
