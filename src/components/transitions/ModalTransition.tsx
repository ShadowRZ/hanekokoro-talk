import clsx from 'clsx'
import { ComponentChildren, Ref } from 'preact'
import { StyleTransition } from 'preact-transitioning'
import { forwardRef } from 'preact/compat'

interface ModalTransitionProps {
  in: boolean
  children: ComponentChildren
  duration: number
  onEnter?: any
  onExited?: any
  className: string
}

export const ModalTransition = forwardRef((props: ModalTransitionProps, ref: Ref<HTMLDivElement>) => {
  const { in: requestOpen, duration, children, onEnter, onExited, className } = props

  return (
    <StyleTransition
      in={requestOpen}
      appear
      duration={duration}
      styles={{
        appear: { opacity: 0, transform: 'scale(.95)' },
        appearActive: { opacity: 1, transform: 'scale(1)' },
        enter: { opacity: 0, transform: 'scale(.95)' },
        enterActive: { opacity: 1, transform: 'scale(1)' },
        exit: { opacity: 1, transform: 'scale(1)' },
        exitActive: { opacity: 0, transform: 'scale(.95)' },
        exitDone: { opacity: 0, transform: 'scale(.95)' }
      }}
      onEnter={onEnter}
      onExited={onExited}
    >
      <div ref={ref} className={clsx('transition duration-200', className)}>{children}</div>
    </StyleTransition>
  )
})
