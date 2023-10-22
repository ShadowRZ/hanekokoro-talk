import {
  useFloating,
  autoUpdate,
  size
} from '@floating-ui/react-dom'
import { useState } from 'preact/hooks'
import { JSX } from 'preact'
import { PopupTransition } from '../transitions/PopupTransition'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { PopoverContent } from './PopoverContent'
import { TALK_NARRATOR } from '../../model/TalkModels'
import { CharAvatar } from '../utils/CharAvatar'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'
import AddCharDialog from './AddCharDialog'

export function CharPopover (): JSX.Element {
  const context = useAppContext()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [current, setCurrent] = useState(TALK_NARRATOR)
  const [openAddCharDialog, setOpenAddCharDialog] = useState(false)

  const shownCharacters = context.shownCharacters

  useSignalEffect(() => {
    setCurrent(shownCharacters.value[context.lastIndex.value])
    const openAddCharDialog = context.showAddCharDialog.value
    if (openAddCharDialog) updateShown(false)
    setOpenAddCharDialog(openAddCharDialog)
  })

  function updateShown (shown: boolean): void {
    setOpen(true)
    setShown(shown)
  }

  const { refs, floatingStyles } = useFloating({
    placement: 'top-start',
    open,
    whileElementsMounted: autoUpdate,
    middleware: [size({
      apply ({ availableWidth, availableHeight, elements }: { availableWidth: number, availableHeight: number, elements: any }) {
        Object.assign(elements.floating.style, {
          maxWidth: `${availableWidth - 4}px`,
          maxHeight: `${availableHeight}px`
        })
      }
    })]
  })

  return (
    <ClickAwayListener onClickAway={() => updateShown(false)}>
      <div class='grow flex flex-row shrink-0 items-end'>
        <button ref={refs.setReference} onClick={() => { updateShown(!shown) }}>
          <CharAvatar character={current} />
        </button>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
        >
          {open && (
            <PopupTransition
              in={shown}
              duration={200}
              onExited={() => setOpen(false)}
              className='z-10 p-1 rounded-lg bg-white dark:bg-gray-950 shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5'
            >
              <PopoverContent />
            </PopupTransition>
          )}
        </div>
        <AddCharDialog open={openAddCharDialog} onClose={() => { context.showAddCharDialog.value = false }} />
      </div>
    </ClickAwayListener>
  )
}
