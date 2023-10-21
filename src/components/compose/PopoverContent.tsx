import { JSX } from 'preact'
import { Tab as BaseTab, TabOwnerState, TabProps } from '@mui/base/Tab'
import { TabsList as BaseTabsList, TabsListProps } from '@mui/base/TabsList'
import { TabPanel as BaseTabPanel, TabPanelProps } from '@mui/base/TabPanel'
import { Tabs } from '@mui/base/Tabs'
import clsx from 'clsx'
import { forwardRef } from 'preact/compat'
import { useState } from 'preact/hooks'
import { CharPanel } from './popover/CharPanel'
import { UploadButton } from './popover/UploadButton'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'
import { StickerPanel } from './popover/StickerPanel'

export function PopoverContent (): JSX.Element {
  const [stickerDisabled, setStickerDisabled] = useState(true)
  const context = useAppContext()
  const shownCharacters = context.shownCharacters
  useSignalEffect(() => {
    const character = shownCharacters.value[context.lastIndex.value]
    setStickerDisabled(character.isNarrator)
  })

  return (
    <Tabs className='flex flex-col-reverse max-w-sm gap-1' defaultValue={1}>
      <TabsList className='flex-row'>
        <Tab title='Characters' className='w-8 h-8' value={1}><span class='w-6 h-6 icon-[solar--user-rounded-bold-duotone]' /></Tab>
        <Tab disabled={stickerDisabled} title='Stickers' className='w-8 h-8' value={2}><span class='w-6 h-6 icon-[solar--sticker-smile-circle-bold-duotone]' /></Tab>
        <div class='grow' />
        <UploadButton />
      </TabsList>
      <TabPanel value={1}><CharPanel /></TabPanel>
      <TabPanel value={2}><StickerPanel /></TabPanel>
    </Tabs>
  )
}

const resolveSlotProps = (fn: any, args: any): any =>
  typeof fn === 'function' ? fn(args) : fn

const TabsList = forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
  const { className, ...other } = props
  return (
    <BaseTabsList
      ref={ref}
      className={clsx(
        'flex',
        className
      )}
      {...other}
    />
  )
})

const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  return (
    <BaseTab
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState: TabOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            className: clsx(
              `rounded-xl transition duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 ${
                ownerState.selected
                  ? 'text-orange-600'
                  : 'text-black/75 dark:text-white/75'
              } ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-25'
                  : 'cursor-pointer'
              } flex justify-center items-center`,
              resolvedSlotProps?.className
            )
          }
        }
      }}
    />
  )
})

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, ...other } = props
  return (
    <BaseTabPanel
      ref={ref}
      className={clsx(
        'p-1 border border-solid border-slate-200 dark:border-slate-700 rounded-lg',
        className
      )}
      {...other}
    />
  )
})
