import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import Dialog from '../utils/Dialog'
import { Button } from '../utils/Button'

export default function AboutAction (): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        title='About'
        onClick={() => setOpen(true)}
        class='pointer-events-auto w-12 h-12 flex justify-center items-center rounded-xl transition duration-200 bg-white/75 dark:bg-black/75 hover:bg-gray-100 dark:hover:bg-gray-900 text-orange-600'
      >
        <span class='w-8 h-8 icon-[solar--info-circle-bold-duotone]' />
      </button>
      <Dialog
        open={open}
        handleClose={() => setOpen(false)}
        aria-labelledby='about-label'
        aria-describedby='about-desc'
      >
        <h2 id='about-label' className='text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100'>
          Hanekokoro Talk
        </h2>
        <p id='about-desc' class='text-gray-700 dark:text-gray-300'>
          Version 0.1.0
        </p>
        <div className='mt-2'>
          <p className='text-sm text-gray-500'>
            A dialogue editor by Yorusaka Miyabi.
          </p>
        </div>
        <div className='mt-4'>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Dialog>
    </div>
  )
}
