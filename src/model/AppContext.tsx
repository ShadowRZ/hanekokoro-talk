import { ReadonlySignal, Signal, computed, signal } from '@preact/signals'
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { TALK_NARRATOR, TalkCharacter, TalkItem } from './TalkModels'

interface IAppContext {
  theme: Signal<'light' | 'dark' | 'system'>
  messages: Signal<TalkItem[]>
  characters: Signal<TalkCharacter[]>
  lastIndex: Signal<number>
  // Local States
  showAddCharDialog: Signal<boolean>
  touchElement: Signal<null | HTMLElement>
  messagesRef: Signal<HTMLDivElement | null>
  // Derived States
  shownCharacters: ReadonlySignal<TalkCharacter[]>
}

const createAppContext = (): IAppContext => {
  const theme = signal(localStorage.getItem('hanekokoro-talk-theme') as ('light' | 'dark' | 'system') ?? 'system')
  const messages = signal(JSON.parse(localStorage.getItem('hanekokoro-talk-messages') ?? '[]') as TalkItem[])
  const characters = signal(JSON.parse(localStorage.getItem('hanekokoro-talk-characters') ?? '[]') as TalkCharacter[])
  const lastIndex = signal(parseInt(localStorage.getItem('hanekokoro-talk-lastindex') ?? '0'))
  const shownCharacters = computed(() => {
    return [TALK_NARRATOR, ...characters.value]
  })

  return {
    theme,
    messages,
    characters,
    lastIndex,
    // Derived States
    shownCharacters,
    // Local States
    showAddCharDialog: signal(false),
    touchElement: signal(null),
    messagesRef: signal(null)
  }
}

const AppContext = createContext<IAppContext>(createAppContext())

const useAppContext = (): IAppContext => useContext(AppContext)

export { AppContext, useAppContext }
