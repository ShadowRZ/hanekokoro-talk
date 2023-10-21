import clsx from 'clsx'
import { ComponentChildren, JSX } from 'preact'
import { StyleTransition } from 'preact-transitioning'

interface FadeProps {
  in: boolean
  children: ComponentChildren
  duration: number
  onEnter?: any
  onExited?: any
  className: string
}

export function Fade (props: FadeProps): JSX.Element {
  const { in: requestOpen, duration, children, onEnter, onExited, className } = props

  return (
    <StyleTransition
      in={requestOpen}
      appear
      duration={duration}
      alwaysMounted
      styles={{
        appear: { opacity: 0 },
        appearActive: { opacity: 1 },
        enter: { opacity: 0 },
        enterActive: { opacity: 1 },
        exit: { opacity: 1 },
        exitActive: { opacity: 0 },
        exitDone: { opacity: 0 }
      }}
      onEnter={onEnter}
      onExited={onExited}
    >
      <div className={clsx('transition-opacity', className)}>{children}</div>
    </StyleTransition>
  )
}
