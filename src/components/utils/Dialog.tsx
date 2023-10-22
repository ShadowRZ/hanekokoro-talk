import clsx from 'clsx'
import { ComponentChildren, JSX } from 'preact'
import { useEffect, useRef, useState } from 'preact/compat'

interface DialogProps {
  open: boolean
  handleClose: any
  children: ComponentChildren
  className?: string
}

export default function Dialog ({ open, handleClose, children, className = 'w-[24rem]', ...other }: DialogProps): JSX.Element {
  const ref = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
      setShown(true)
    } else {
      setShown(false)
    }
  }, [open])

  const onTransitionEnd = (): void => {
    if (!open) ref.current?.close()
  }

  const onKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Escape') {
      ev.preventDefault()
      setShown(false)
      handleClose()
    }
  }

  return (
    <div
      class={clsx(
        'z-40 p-4 fixed inset-0 flex items-center justify-center bg-black/50 transition duration-200',
        shown ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      role='presentation'
    >
      <dialog
        ref={ref}
        onTransitionEnd={onTransitionEnd}
        onKeyDown={onKeyDown}
        class={clsx(
          'fixed transition duration-200 inset-0 p-4 appearance-none rounded-lg',
          'bg-white dark:bg-black shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5',
          'backdrop:bg-transparent', className,
          shown ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
        {...other}
      >
        {children}
      </dialog>
    </div>
  )
}
