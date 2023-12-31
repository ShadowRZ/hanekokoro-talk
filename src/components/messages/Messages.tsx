import { JSX } from 'preact'
import { useAppContext } from '../../model/AppContext'
import { MessageItem } from './MessageItem'
import { NarrratorItem } from './NarratorItem'
import { TalkContentText } from '../../model/TalkModels'

export function Messages (): JSX.Element {
  const context = useAppContext()
  const shownCharacters = context.shownCharacters
  const isNarrator = (idx: number): boolean => {
    return shownCharacters.value[idx].isNarrator
  }

  const onContextMenu = (ev: Event): void => {
    context.contextElement.value = ev.target as HTMLElement
    ev.preventDefault()
  }

  const setRef = (ref: HTMLDivElement | null): void => {
    context.messagesRef.value = ref
  }

  return (
    <div
      onContextMenuCapture={onContextMenu}
      class='overflow-auto flex-initial grow px-1 pt-1 flex flex-col gap-2'
    >
      {context.messages.value.length !== 0
        ? context.messages.value.map((item, idx) => {
          if (isNarrator(item.characterIdx)) return <NarrratorItem idx={idx} item={item.message as TalkContentText} />
          return <MessageItem key={idx} message={item} idx={idx} />
        })
        : <Placeholder />}
      <div ref={setRef} />
    </div>
  )
}

function Placeholder (): JSX.Element {
  return (
    <div class='pointer-events-none w-full h-full flex items-center justify-center'>
      <span class='font-bold text-2xl text-gray-500'>Write something!</span>
    </div>
  )
}
