import { useEffect, useRef, useState } from 'preact/hooks'
import { JSX } from 'preact'
import { PopupTransition } from '../transitions/PopupTransition'
import { PopoverContent } from './PopoverContent'
import { TALK_NARRATOR } from '../../model/TalkModels'
import { CharAvatar } from '../utils/CharAvatar'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'
import AddCharDialog from './dialogs/AddCharDialog'
import AddGroupDialog from './dialogs/AddGroupDialog'
import EditGroupDialog from './dialogs/EditGroupDialog'

export function CharPopover (): JSX.Element {
  const context = useAppContext()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [current, setCurrent] = useState(TALK_NARRATOR)
  const [openAddCharDialog, setOpenAddCharDialog] = useState(false)
  const [openAddGroupDialog, setOpenAddGroupDialog] = useState(false)
  const [openEditGroupDialog, setOpenEditGroupDialog] = useState(false)
  const [transitionEnd, setTransitionEnd] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const shownCharacters = context.shownCharacters

  useSignalEffect(() => {
    setCurrent(shownCharacters.value[context.lastIndex.value])
    const openAddCharDialog = context.showAddCharDialog.value
    const openAddGroupDialog = context.showAddGroupDialog.value
    const openEditGroupDialog = context.showEditGruopDialog.value !== null
    if (openAddCharDialog || openAddGroupDialog || openEditGroupDialog) updateShown(false)
    setOpenAddCharDialog(openAddCharDialog)
    setOpenAddGroupDialog(openAddGroupDialog)
    setOpenEditGroupDialog(openEditGroupDialog)
  })

  useEffect(() => {
    if (transitionEnd) context.showEditGruopDialog.value = null
    setTransitionEnd(false)
  }, [transitionEnd])

  function updateShown (shown: boolean): void {
    setOpen(true)
    setShown(shown)
  }

  const onClick = (ev: KeyboardEvent): void => {
    if (open && !(ref.current?.contains(ev.target as HTMLElement) ?? false)) {
      updateShown(false)
    }
  }

  useEffect(() => {
    if (open) document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  })

  return (
    <div class='grow flex flex-row shrink-0 items-end'>
      <button onClick={() => { updateShown(!shown) }}>
        <CharAvatar character={current} />
      </button>
      {open && (
        <div ref={ref} class='absolute bottom-14 left-0 mx-1'>
          <PopupTransition
            in={shown}
            duration={200}
            onExited={() => setOpen(false)}
            className='z-10 p-1 rounded-lg bg-white dark:bg-gray-950 shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5'
          >
            <PopoverContent />
          </PopupTransition>
        </div>
      )}
      <AddCharDialog open={openAddCharDialog} onClose={() => { context.showAddCharDialog.value = false }} />
      <AddGroupDialog open={openAddGroupDialog} onClose={() => { context.showAddGroupDialog.value = false }} />
      {context.showEditGruopDialog.value !== null
        ? <EditGroupDialog
            id={context.showEditGruopDialog.value}
            open={openEditGroupDialog}
            onClose={() => { setOpenEditGroupDialog(false) }}
            onTransitionEnd={() => { if (!openEditGroupDialog) setTransitionEnd(true) }}
          />
        : <></>}
    </div>
  )
}
