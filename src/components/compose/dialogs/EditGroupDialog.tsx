import { JSX } from 'preact'
import Dialog from '../../utils/Dialog'
import Divider from '../../utils/Divider'
import { Button } from '../../utils/Button'
import { SubmitButton } from '../../utils/SubmitButton'
import { useCallback, useRef } from 'preact/hooks'
import { useAppContext } from '../../../model/AppContext'
import { DialogItem } from './DialogItem'
import { CharAvatar } from '../../utils/CharAvatar'
import { TalkGroup } from '../../../model/TalkModels'

export default function EditGroupDialog ({ id, open, onClose, onTransitionEnd = () => {} }: { id: number, open: boolean, onClose: any, onTransitionEnd?: any }): JSX.Element {
  const form = useRef<HTMLFormElement>(null)
  const context = useAppContext()

  const onSubmit = useCallback((event: Event) => {
    event.preventDefault()
    void (async () => {
      if (form.current !== null) {
        const data = new FormData(form.current)
        const name = data.get('name') as string
        const characterIdxs = data.getAll('characters') as unknown as number[]
        const group: TalkGroup = {
          name,
          characterIdxs
        }
        context.charGroups.value = context.charGroups.value.map((value, idx) => {
          return idx === id ? group : value
        })
        onClose()
        form.current.reset()
      }
    })()
  }, [onClose])

  const onDialogClose = (): void => {
    if (form.current !== null) {
      onClose()
      form.current.reset()
    }
  }

  return (
    <Dialog
      open={open}
      handleClose={onClose}
      handleTransitionEnd={() => {
        if (!open) onTransitionEnd()
      }}
      className='w-[32rem]'
      aria-labelledby='addgroup-label'
      aria-describedby='addgroup-desc'
    >
      <h2 id='addgroup-label' className='text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100'>
        Edit group {context.charGroups.value[id].name}
      </h2>
      <p id='addgroup-desc' class='text-gray-700 dark:text-gray-300'>
        Edit group {context.charGroups.value[id].name}.
      </p>
      <Divider />
      <form method='dialog' ref={form} onSubmit={onSubmit}>
        <EditGroupDialogPanel id={id} />
        <div class='flex flex-row gap-2 mt-2'>
          <SubmitButton value='Save' />
          <Button onClick={onDialogClose}>Close</Button>
        </div>
      </form>
    </Dialog>
  )
}

function EditGroupDialogPanel ({ id }: { id: number }): JSX.Element {
  const context = useAppContext()
  const characters = context.characters
  const charGroups = context.charGroups
  const characterIdxs = context.charGroups.value[id].characterIdxs

  return (
    <div class='flex flex-col gap-2'>
      <DialogItem labelFor='name' title='Group Name' description='Specify the group name.'>
        <div class='rounded-lg border-2 border-gray-400 focus-within:border-orange-600 my-1 p-2'>
          <input
            type='text'
            id='name'
            name='name'
            required
            class='w-full outline-none bg-transparent'
            value={charGroups.value[id].name}
          />
        </div>
      </DialogItem>
      <DialogItem labelFor='characters' title='Characters' description='Specify the characters contained in the group.'>
        <div class='flex flex-row gap-2 py-2'>
          {characters.value.map((value, idx) => {
            const storedIdx = idx + 1
            return (
              <div class='flex flex-row' key={storedIdx}>
                <input
                  class='peer appearance-none'
                  type='checkbox'
                  id={'e-c-' + storedIdx.toString()}
                  name='characters'
                  value={storedIdx}
                  checked={characterIdxs.includes(storedIdx)}
                />
                <label
                  for={'e-c-' + storedIdx.toString()}
                  class='shrink-0 rounded-full w-12 h-12 ring-orange-600 peer-checked:ring-2'
                >
                  <CharAvatar character={value} />
                </label>
              </div>
            )
          })}
        </div>
      </DialogItem>
    </div>
  )
}
