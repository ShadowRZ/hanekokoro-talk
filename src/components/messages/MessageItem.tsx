import { JSX } from 'preact'
import { TalkContent, TalkItem } from '../../model/TalkModels'
import { CharAvatar } from '../utils/CharAvatar'
import { useEffect, useRef, useState } from 'preact/hooks'
import { MessageActions } from './MessageActions'
import { useAppContext } from '../../model/AppContext'
import { PopupTransition } from '../transitions/PopupTransition'
import { useSignalEffect } from '@preact/signals'

export function MessageItem ({ message, idx }: { message: TalkItem, idx: number }): JSX.Element {
  const context = useAppContext()
  const shownCharacters = context.shownCharacters
  const charGroups = context.charGroups
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const onClick = (ev: KeyboardEvent): void => {
    if (open && !(popupRef.current?.contains(ev.target as HTMLElement) ?? false)) {
      setOpen(false)
    }
  }

  useSignalEffect(() => {
    if (ref.current?.contains(context.contextElement.value) ?? false) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  })

  useEffect(() => {
    if (!open) context.contextElement.value = null
  }, [open])

  useEffect(() => {
    if (open) document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  })

  return (
    <div
      ref={ref}
      class='relative flex flex-row gap-2'
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div class='shrink-0'>
        <CharAvatar character={shownCharacters.value[message.characterIdx]} />
      </div>
      <div class='-translate-y-1 grow flex flex-col'>
        <div>
          <span class='font-bold flex flex-row gap-1'>
            <span>{message.nameOverride ? message.nameOverride : shownCharacters.value[message.characterIdx].name /* eslint-disable-line @typescript-eslint/strict-boolean-expressions */}</span>
            {message.charGroup !== undefined ? <span class='text-gray-400'>@{charGroups.value[message.charGroup].name}</span> : <></>}
          </span>
          <div class='w-fit'>
            <MessageContent content={message.message} />
          </div>
        </div>
      </div>
      <PopupTransition
        in={open}
        duration={200}
        onExited={() => setOpen(false)}
        className='absolute z-50 transition duration-200 left-14 bottom-0'
      >
        <MessageActions
          ref={popupRef}
          messageIdx={idx}
        />
      </PopupTransition>
    </div>
  )
}

function MessageContent ({ content }: { content: TalkContent }): JSX.Element {
  switch (content.type) {
    case 'text':
      return (
        <div style={{ overflowWrap: 'anywhere' }} class='w-fit rounded-lg bg-orange-600 p-2 text-white'>
          {content.content}
        </div>
      )
    case 'image':
      return (
        <img src={content.contentUrl} class='rounded-lg w-full max-w-md' />
      )
    case 'sticker':
      return (
        <img src={content.contentUrl} class='bg-transparent' />
      )
    default:
      return (
        <div>Failed to render something!</div>
      )
  }
}
