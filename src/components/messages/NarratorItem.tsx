import { JSX } from 'preact'
import { TalkContentText } from '../../model/TalkModels'
import { useEffect, useRef, useState } from 'preact/hooks'
import { MessageActions } from './MessageActions'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'
import { PopupTransition } from '../transitions/PopupTransition'

export function NarrratorItem ({ item, idx }: { item: TalkContentText, idx: number }): JSX.Element {
  const context = useAppContext()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const onClick = (ev: KeyboardEvent): void => {
    if (open && !(popupRef.current?.contains(ev.target as HTMLElement) ?? false)) {
      setOpen(false)
    }
  }

  useSignalEffect(() => {
    if (!open && (ref.current?.contains(context.contextElement.value) ?? false)) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  })

  useEffect(() => {
    if (!open) context.contextElement.value = null
  }, [open])

  useEffect(() => {
    if (open) document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  })

  return (
    <div
      ref={ref}
      class='flex flex-row justify-center gap-2'
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div class='relative'>
        <span class='px-2 py-1 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white'>
          {item.content}
        </span>
        <PopupTransition
          in={open}
          duration={200}
          onExited={() => setOpen(false)}
          className='absolute z-50 transition duration-200 -bottom-2'
        >
          <MessageActions
            ref={popupRef}
            messageIdx={idx}
          />
        </PopupTransition>
      </div>
    </div>
  )
}
