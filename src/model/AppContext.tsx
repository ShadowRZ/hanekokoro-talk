import { ReadonlySignal, Signal, computed, signal } from '@preact/signals'
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { TALK_NARRATOR, TalkCharacter, TalkGroup, TalkItem } from './TalkModels'

interface IAppContext {
  theme: Signal<'light' | 'dark' | 'system'>
  messages: Signal<TalkItem[]>
  characters: Signal<TalkCharacter[]>
  charGroups: Signal<TalkGroup[]>
  lastIndex: Signal<number>
  lastGroup: Signal<number | null>
  sending: Signal<'enter' | 'ctrl-enter'>
  // Local States
  showAddCharDialog: Signal<boolean>
  showAddGroupDialog: Signal<boolean>
  showEditGruopDialog: Signal<number | null>
  contextElement: Signal<null | HTMLElement>
  messagesRef: Signal<HTMLDivElement | null>
  // Derived States
  shownCharacters: ReadonlySignal<TalkCharacter[]>
}

const createAppContext = (): IAppContext => {
  const theme = signal(localStorage.getItem('hanekokoro-talk-theme') as ('light' | 'dark' | 'system') ?? 'system')
  const messages = signal(JSON.parse(localStorage.getItem('hanekokoro-talk-messages') ?? '[]') as TalkItem[])
  const characters = signal(JSON.parse(localStorage.getItem('hanekokoro-talk-characters') ?? '[]') as TalkCharacter[])
  const charGroups = signal(JSON.parse(localStorage.getItem('hanekokoro-talk-char-groups') ?? '[]') as TalkGroup[])
  const lastIndex = signal(parseInt(localStorage.getItem('hanekokoro-talk-lastindex') ?? '0'))
  const groupStorage = localStorage.getItem('hanekokoro-talk-lastgroup') ?? ''
  let lastGroup: number | null = null
  if (groupStorage !== '') {
    lastGroup = parseInt(groupStorage)
  }
  const sending = signal(localStorage.getItem('hanekokoro-talk-sending') as ('enter' | 'ctrl-enter') ?? 'enter')
  const shownCharacters = computed(() => {
    return [TALK_NARRATOR, ...characters.value]
  })

  return {
    theme,
    messages,
    characters,
    charGroups,
    lastIndex,
    lastGroup: signal(lastGroup),
    sending,
    // Derived States
    shownCharacters,
    // Local States
    showAddCharDialog: signal(false),
    showAddGroupDialog: signal(false),
    showEditGruopDialog: signal(null),
    contextElement: signal(null),
    messagesRef: signal(null)
  }
}

const AppContext = createContext<IAppContext>(createAppContext())

const useAppContext = (): IAppContext => useContext(AppContext)

export { AppContext, useAppContext }
