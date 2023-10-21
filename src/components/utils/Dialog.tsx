import { Modal } from '@mui/base/Modal'
import clsx from 'clsx'
import { ComponentChildren, JSX, Ref } from 'preact'
import { forwardRef } from 'preact/compat'
import { Fade } from '../transitions/Fade'
import { ModalTransition } from '../transitions/ModalTransition'

interface DialogProps {
  open: boolean
  handleClose: any
  children: ComponentChildren
  className?: string
}

export default function Dialog ({ open, handleClose, children, className = 'max-w-sm' }: DialogProps): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      className='z-40 fixed inset-0 flex items-center justify-center p-4'
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalTransition
        in={open}
        duration={200}
        className={clsx('duration-200 z-20 w-full p-4 rounded-lg bg-white dark:bg-black shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5', className)}
      >
        {children}
      </ModalTransition>
    </Modal>
  )
}

const StyledBackdrop = forwardRef((props: BackdropProps, ref: Ref<HTMLDivElement>) => {
  const { open, className, ...other } = props
  return (
    <Backdrop
      open={open}
      className={clsx('fixed inset-0 bg-black/50', className)}
      ref={ref}
      aria-hidden='true'
      {...other}
    />
  )
})

interface BackdropProps {
  open: boolean
  className: string
}

const Backdrop = forwardRef((props: BackdropProps, ref: Ref<HTMLDivElement>) => {
  const { open, className, ...other } = props
  return (
    <Fade in={open} className={className} duration={200}>
      <div
        ref={ref}
        {...other}
      />
    </Fade>
  )
})
