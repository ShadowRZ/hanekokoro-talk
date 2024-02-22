import { persistentAtom } from '@nanostores/persistent'
import type { ThemeOptions } from '../types'
import { atom, computed } from 'nanostores'
import { characters } from './character'

const THEME_LOCALSTORAGE_ID = 'hanekokoro-talk-theme'

export const theme = persistentAtom<ThemeOptions>(THEME_LOCALSTORAGE_ID, undefined)
export const switchCharacter = atom(false)
export const switchButton = atom<HTMLButtonElement | undefined>(undefined)
export const currentCharacter = atom(-1)
export const currentSession = atom<number | undefined>(undefined)

// Dialogs
export const addCharacterDialog = atom(false)
export const aboutDialog = atom(false)

export const placeholder = computed(
  [currentCharacter, characters],
  (currentCharacter, characters) => {
    if (currentCharacter === -1) return 'Write something...'
    else {
      const character = characters.find((value) => value.id === currentCharacter)
      if (character !== undefined) return `Write as ${character.name}...`
      else return 'Write something...'
    }
  }
)
