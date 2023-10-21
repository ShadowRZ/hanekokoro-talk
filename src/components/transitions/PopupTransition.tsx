import clsx from 'clsx'
import { ComponentChildren, Ref } from 'preact'
import { StyleTransition } from 'preact-transitioning'
import { forwardRef } from 'preact/compat'

interface PopupTransitionProps {
  in: boolean
  children: ComponentChildren
  duration: number
  onExited?: any
  className?: string
}

export const PopupTransition = forwardRef((props: PopupTransitionProps, ref: Ref<HTMLDivElement>) => {
  const { in: requestOpen, duration, onExited, children, className } = props

  return (
    <StyleTransition
      in={requestOpen}
      appear
      onExited={onExited}
      duration={duration}
      styles={{
        appear: { opacity: 0, transform: 'translateY(0.1rem)' },
        appearActive: { opacity: 1, transform: 'translateY(0)' },
        appearDone: { opacity: 1, transform: 'translateY(0)' },
        enter: { opacity: 0, transform: 'translateY(0.1rem)' },
        enterActive: { opacity: 1, transform: 'translateY(0)' },
        enterDone: { opacity: 1, transform: 'translateY(0)' },
        exit: { opacity: 1, transform: 'translateY(0)' },
        exitActive: { opacity: 0, transform: 'translateY(0.1rem)' },
        exitDone: { opacity: 0, transform: 'translateY(0.1rem)' }
      }}
    >
      <div
        ref={ref}
        className={clsx('transition duration-200', className)}
      >
        {children}
      </div>
    </StyleTransition>
  )
})
