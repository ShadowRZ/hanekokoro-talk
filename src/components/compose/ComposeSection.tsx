import { JSX } from 'preact'
import { CharPopover } from './CharPopover'
import { useRef, useState } from 'preact/hooks'
import { TalkItem } from '../../model/TalkModels'
import { useAppContext } from '../../model/AppContext'
import clsx from 'clsx'
import { useComputed } from '@preact/signals'

export function ComposeSection (): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const context = useAppContext()
  const characters = context.shownCharacters
  const messagesRef = context.messagesRef.value

  const placeholder = useComputed(() => {
    const character = characters.value[context.lastIndex.value]
    if (character.isNarrator) {
      return 'Write something...'
    } else {
      return `Write as ${character.name}...`
    }
  })

  const sendTalkItem = (): void => {
    const content = contentRef.current?.innerText
    if (content === undefined || content === '') return
    const item: TalkItem = {
      characterIdx: context.lastIndex.value,
      message: {
        type: 'text',
        content
      }
    }
    context.messages.value = [...context.messages.value, item]
    setTimeout(() => {
      messagesRef?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    })
    if (contentRef.current !== null) contentRef.current.innerText = ''
    updateEnabledState()
  }

  const updateEnabledState = (): void => {
    const content = contentRef.current?.innerText
    setEnabled(content !== undefined && content !== '')
  }

  return (
    <div class='box-content min-h-12 flex items-stretch gap-2 p-1'>
      <CharPopover />
      <div class='flex items-center min-h-full w-full max-w-full rounded-lg border-2 border-gray-400 focus-within:border-orange-600'>
        <span
          onInput={updateEnabledState}
          ref={contentRef}
          contenteditable
          data-placeholder={placeholder.value}
          style={{ overflowWrap: 'anywhere' }}
          class={clsx('block m-2 grow break-all outline-none hover:cursor-text after:text-gray-500', 'empty:after:content-[attr(data-placeholder)]')}
        />
      </div>
      <div class='grow flex flex-row shrink-0 items-end'>
        <button
          onClick={sendTalkItem}
          title='Send Message'
          disabled={!enabled}
          class={clsx(
            'group w-12 h-12 justify-center flex items-center rounded-full enabled:hover:bg-orange-600',
            { 'cursor-not-allowed': !enabled }
          )}
        >
          <span class='w-8 h-8 text-orange-600 group-disabled:text-orange-600/40 group-hover:text-white icon-[solar--plain-2-bold-duotone]' />
        </button>
      </div>
    </div>
  )
}
