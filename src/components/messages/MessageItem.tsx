import { JSX } from 'preact'
import { TalkContent, TalkItem } from '../../model/TalkModels'
import { CharAvatar } from '../utils/CharAvatar'
import { useRef, useState } from 'preact/hooks'
import { MessageActions } from './MessageActions'
import clsx from 'clsx'
import { useAppContext } from '../../model/AppContext'
import { useSignalEffect } from '@preact/signals'

export function MessageItem ({ message, idx }: { message: TalkItem, idx: number }): JSX.Element {
  const context = useAppContext()
  const shownCharacters = context.shownCharacters
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useSignalEffect(() => {
    if (ref.current?.contains(context.touchElement.value) ?? false) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  })

  return (
    <div
      ref={ref}
      class='relative flex flex-row gap-2'
      onMouseOverCapture={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div class='shrink-0'>
        <CharAvatar character={shownCharacters.value[message.characterIdx]} />
      </div>
      <div class='-translate-y-1 grow flex flex-col'>
        <div>
          <span class='font-bold'>{message.nameOverride ?? shownCharacters.value[message.characterIdx].name}</span>
          <div class='w-fit'>
            <MessageContent content={message.message} />
          </div>
        </div>
      </div>
      <MessageActions messageIdx={idx} className={clsx('absolute left-14 -bottom-8', { hidden: !open })} />
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
