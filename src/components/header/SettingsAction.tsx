import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import Dialog from '../utils/Dialog'
import Divider from '../utils/Divider'
import { ThemeToggle } from '../utils/ThemeToggle'
import { Button } from '../utils/Button'
import { useAppContext } from '../../model/AppContext'

export default function SettingsAction (): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        class='pointer-events-auto w-12 h-12 flex justify-center items-center rounded-xl transition duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 text-orange-600'
      >
        <span class='w-8 h-8 icon-[solar--settings-bold-duotone]' />
      </button>
      <Dialog open={open} handleClose={() => setOpen(false)} className='max-w-lg'>
        <h2 className='text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100'>
          Settings
        </h2>
        <p class='text-gray-700 dark:text-gray-300'>
          Changes will take effect immediately.
        </p>
        <Divider />
        <SettingsPanel />
        <div className='mt-4'>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Dialog>
    </div>
  )
}

function SettingsItem ({ title, description, children }): JSX.Element {
  return (
    <div class='flex flex-row gap-2'>
      <div>
        <h3 className='text-lg font-bold leading-6 text-gray-900 dark:text-gray-100'>
          {title}
        </h3>
        <p class='text-gray-700 dark:text-gray-300'>
          {description}
        </p>
        {children}
      </div>
    </div>
  )
}

function SettingsPanel (): JSX.Element {
  const context = useAppContext()
  const deleteMessages = (): void => {
    context.messages.value = []
  }

  return (
    <div class='flex flex-col gap-2'>
      <SettingsItem title='Theme Color' description='Specify the color for the app.'>
        <ThemeToggle />
      </SettingsItem>
      <SettingsItem title='Delete Messages' description='Delete all chat messages.'>
        <Button className='my-2' onClick={deleteMessages}>Delete all messages</Button>
      </SettingsItem>
    </div>
  )
}
