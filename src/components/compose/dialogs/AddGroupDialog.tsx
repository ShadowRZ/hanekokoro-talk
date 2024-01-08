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

export default function AddGroupDialog ({ open, onClose }: { open: boolean, onClose: any }): JSX.Element {
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
        context.charGroups.value = [...context.charGroups.value, group]
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
      className='w-[32rem]'
      aria-labelledby='addgroup-label'
      aria-describedby='addgroup-desc'
    >
      <h2 id='addgroup-label' className='text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100'>
        Add a group
      </h2>
      <p id='addgroup-desc' class='text-gray-700 dark:text-gray-300'>
        Add a new group to Hanekokoro Talk.
      </p>
      <Divider />
      <form method='dialog' ref={form} onSubmit={onSubmit}>
        <AddGroupDialogPanel />
        <div class='flex flex-row gap-2 mt-2'>
          <SubmitButton value='Save' />
          <Button onClick={onDialogClose}>Close</Button>
        </div>
      </form>
    </Dialog>
  )
}

function AddGroupDialogPanel (): JSX.Element {
  const context = useAppContext()
  const characters = context.characters

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
          />
        </div>
      </DialogItem>
      <DialogItem labelFor='characters' title='Characters' description='Specify the characters contained in the group.'>
        <div class='flex flex-row gap-2 py-2'>
          {characters.value.map((value, idx) => {
            const storedIdx = idx + 1
            return (
              <div class='flex flex-row' key={storedIdx}>
                <input class='peer appearance-none' type='checkbox' id={'c-' + storedIdx.toString()} name='characters' value={storedIdx} />
                <label
                  for={'c-' + storedIdx.toString()}
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
