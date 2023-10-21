import { JSX } from 'preact'
import { TalkContentText } from '../../model/TalkModels'
import { useFloating, autoUpdate, flip, size } from '@floating-ui/react-dom'
import clsx from 'clsx'
import { useRef, useState } from 'preact/hooks'
import { MessageActions } from './MessageActions'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'

export function NarrratorItem ({ item, idx }: { item: TalkContentText, idx: number }): JSX.Element {
  const context = useAppContext()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    open,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [flip(), size({
      apply ({ availableWidth, availableHeight, elements }: { availableWidth: number, availableHeight: number, elements: any }) {
        Object.assign(elements.floating.style, {
          maxWidth: `${availableWidth - 4}px`,
          maxHeight: `${availableHeight}px`
        })
      }
    })]
  })

  useSignalEffect(() => {
    if (ref.current?.contains(context.touchElement.value) ?? false) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  })

  return (
    <div
      ref={ref}
      class='flex flex-row justify-center gap-2'
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span ref={refs.setReference} class='px-2 py-1 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white'>
        {item.content}
      </span>
      <MessageActions messageIdx={idx} ref={refs.setFloating} style={floatingStyles} className={clsx({ hidden: !open })} />
    </div>
  )
}
