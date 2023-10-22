import { JSX } from 'preact'
import Dialog from '../utils/Dialog'
import Divider from '../utils/Divider'
import { Button } from '../utils/Button'
import { SubmitButton } from '../utils/SubmitButton'
import { useCallback, useRef } from 'preact/hooks'
import { TalkCharacter } from '../../model/TalkModels'
import { resizeImageAsUrl } from '../../utils/FileUtils'
import { useAppContext } from '../../model/AppContext'
import clsx from 'clsx'

export default function AddCharDialog ({ open, onClose }: { open: boolean, onClose: any }): JSX.Element {
  const form = useRef<HTMLFormElement>(null)
  const context = useAppContext()

  const onSubmit = useCallback((event: Event) => {
    event.preventDefault()
    void (async () => {
      if (form.current !== null) {
        const data = new FormData(form.current)
        const name = data.get('name') as string
        const file = data.get('avatar') as File

        const avatarUrl = await resizeImageAsUrl(file, 128)
        const char: TalkCharacter = {
          name,
          avatarUrl,
          isNarrator: false
        }
        context.characters.value = [...context.characters.value, char]
        onClose()
      }
    })()
  }, [onClose])

  return (
    <Dialog open={open} handleClose={onClose} className='w-[32rem]'>
      <h2 className='text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100'>
        Add a character
      </h2>
      <p class='text-gray-700 dark:text-gray-300'>
        Add a new character to Hanekokoro Talk.
      </p>
      <Divider />
      <form method='dialog' ref={form} onSubmit={onSubmit}>
        <AddCharDialogPanel />
        <div class='flex flex-row gap-2 mt-2'>
          <SubmitButton value='Save' />
          <Button onClick={onClose}>Close</Button>
        </div>
      </form>
    </Dialog>
  )
}

function AddCharDialogItem ({ title, description, labelFor, children }): JSX.Element {
  return (
    <div class='flex flex-row gap-2'>
      <div class='grow'>
        <h3 className='text-lg font-bold leading-6 text-gray-900 dark:text-gray-100'>
          <label for={labelFor}>{title}</label>
        </h3>
        <p class='text-gray-700 dark:text-gray-300'>
          {description}
        </p>
        {children}
      </div>
    </div>
  )
}

function AddCharDialogPanel (): JSX.Element {
  return (
    <div class='flex flex-col gap-2'>
      <AddCharDialogItem labelFor='name' title='Character Name' description='Specify the character name.'>
        <div class='rounded-lg border-2 border-gray-400 focus-within:border-orange-600 my-1 p-2'>
          <input
            type='text'
            id='name'
            name='name'
            required
            class='w-full outline-none bg-transparent'
          />
        </div>
      </AddCharDialogItem>
      <AddCharDialogItem labelFor='avatar' title='Character Avatar' description='Specify the character avatar.'>
        <input
          type='file'
          id='avatar'
          name='avatar'
          accept='image/*'
          required
          class={clsx(
            'my-1 text-gray-600 dark:text-gray-400 file:bg-orange-600/25 file:hover:bg-orange-600/75 file:rounded-md file:font-medium file:text-sm',
            'file:transition file:duration-200 file:border-none file:text-orange-700 file:hover:text-orange-50 file:px-4 file:py-2 file:hover:cursor-pointer'
          )}
        />
      </AddCharDialogItem>
    </div>
  )
}
