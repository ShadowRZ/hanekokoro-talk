import { ComponentChildren, JSX } from 'preact'
import clsx from 'clsx'
import { useState } from 'preact/hooks'
import { CharPanel } from './popover/CharPanel'
import { UploadButton } from './popover/UploadButton'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'
import { StickerPanel } from './popover/StickerPanel'
import { GroupsPanel } from './popover/GroupsPanel'

export function PopoverContent (): JSX.Element {
  const [stickerDisabled, setStickerDisabled] = useState(true)
  const context = useAppContext()
  const [selected, setSelected] = useState(1)
  const shownCharacters = context.shownCharacters
  useSignalEffect(() => {
    const character = shownCharacters.value[context.lastIndex.value]
    setStickerDisabled(character.isNarrator)
  })

  return (
    <div className='flex flex-col-reverse max-w-sm gap-1'>
      <div className='flex flex-row' role='tablist'>
        <Tab title='Characters' className='w-8 h-8' selected={selected === 1} onClick={() => setSelected(1)}>
          <span aria-hidden class='w-6 h-6 icon-[solar--user-rounded-bold-duotone]' />
        </Tab>
        <Tab title='Character Groups' selected={selected === 2} className='w-8 h-8' onClick={() => setSelected(2)}>
          <span aria-hidden class='w-6 h-6 icon-[solar--users-group-two-rounded-bold-duotone]' />
        </Tab>
        <Tab disabled={stickerDisabled} title='Stickers' selected={selected === 3} className='w-8 h-8' onClick={() => setSelected(3)}>
          <span aria-hidden class='w-6 h-6 icon-[solar--sticker-smile-circle-bold-duotone]' />
        </Tab>
        <div class='grow' />
        <UploadButton />
      </div>
      <TabPanel shown={selected === 1}><CharPanel /></TabPanel>
      <TabPanel shown={selected === 2}><GroupsPanel /></TabPanel>
      <TabPanel shown={selected === 3}><StickerPanel /></TabPanel>
    </div>
  )
}

function Tab (props: {
  className: string
  selected: boolean
  title: string
  children: ComponentChildren
  onClick: any
  disabled?: boolean
}): JSX.Element {
  const { className, selected, title, disabled = false, ...other } = props

  return (
    <button
      role='tab'
      {...other}
      className={clsx(
        `rounded-xl transition duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 ${
          props.selected
            ? 'text-orange-600'
            : 'text-black/75 dark:text-white/75'
        } disabled:cursor-not-allowed disabled:opacity-25 cursor-pointer
        flex justify-center items-center`,
        className
      )}
      disabled={disabled}
      title={title}
    />
  )
}

function TabPanel (props: { className?: string, shown: boolean, children: ComponentChildren }): JSX.Element {
  const { className, shown, ...other } = props
  return (
    <div
      role='tabpanel'
      className={clsx(
        'p-1 border border-solid border-slate-200 dark:border-slate-700 rounded-lg',
        { hidden: !shown },
        className
      )}
      {...other}
    />
  )
}
