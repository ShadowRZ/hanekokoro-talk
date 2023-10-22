import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import Dialog from '../utils/Dialog'
import Divider from '../utils/Divider'
import { ThemeToggle } from '../utils/ThemeToggle'
import { Button } from '../utils/Button'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'

export default function SettingsAction (): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        title='Settings'
        onClick={() => setOpen(true)}
        class='pointer-events-auto w-12 h-12 flex justify-center items-center rounded-xl transition duration-200 bg-white/75 dark:bg-black/75 hover:bg-gray-100 dark:hover:bg-gray-900 text-orange-600'
      >
        <span class='w-8 h-8 icon-[solar--settings-bold-duotone]' />
      </button>
      <Dialog
        open={open}
        handleClose={() => setOpen(false)}
        className='w-[32rem]'
        aria-labelledby='settings-label'
        aria-describedby='settings-desc'
      >
        <h2 id='settings-label' className='text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100'>
          Settings
        </h2>
        <p id='settings-desc' class='text-gray-700 dark:text-gray-300'>
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
  const [isEnter, setIsEnter] = useState(true)
  const [isCtrlEnter, setIsCtrlEnter] = useState(false)
  const deleteMessages = (): void => {
    context.messages.value = []
  }

  const onChange = (ev: Event): void => {
    context.sending.value = (ev.target as HTMLInputElement).value as ('enter' | 'ctrl-enter')
  }

  useSignalEffect(() => {
    if (context.sending.value === 'enter') {
      setIsEnter(true)
      setIsCtrlEnter(false)
    } else {
      setIsEnter(false)
      setIsCtrlEnter(true)
    }
  })

  return (
    <div class='flex flex-col gap-2'>
      <SettingsItem title='Theme Color' description='Specify the color for the app.'>
        <ThemeToggle />
      </SettingsItem>
      <SettingsItem title='Sending message' description='Specify how to send the message.'>
        <div class='flex flex-col gap-0.5 my-1'>
          <div class='flex flex-row gap-1'>
            <input checked={isEnter} type='radio' id='sending-enter' name='sending' value='enter' onChange={onChange} />
            <label for='sending-enter'><kbd>Enter</kbd> to send, <kbd>Ctrl</kbd> + <kbd>Enter</kbd> for newline</label>
          </div>
          <div class='flex flex-row gap-1'>
            <input checked={isCtrlEnter} type='radio' id='sending-ctrl-enter' name='sending' value='ctrl-enter' onChange={onChange} />
            <label for='sending-ctrl-enter'><kbd>Enter</kbd> for newline, <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to send</label>
          </div>
          <p><kbd>Shift</kbd> + <kbd>Enter</kbd> can be used for putting a newline independent of this option.</p>
        </div>
      </SettingsItem>
      <SettingsItem title='Delete Messages' description='Delete all chat messages.'>
        <Button className='my-2' onClick={deleteMessages}>Delete all messages</Button>
      </SettingsItem>
    </div>
  )
}
