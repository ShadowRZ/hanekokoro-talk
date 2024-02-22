import { characters } from '../store/character'
import { messages } from '../store/messages'
import { theme } from '../store/ui-states'
import { set } from './indexeddb'
import { registerThemeHandler, removeThemeHandler } from './utils'

export function subscribeTheme (): (() => void) {
  return theme.subscribe((value) => {
    switch (value) {
      case undefined: {
        registerThemeHandler()
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        break
      }
      case 'light': {
        removeThemeHandler()
        document.documentElement.classList.remove('dark')
        break
      }
      case 'dark': {
        removeThemeHandler()
        document.documentElement.classList.add('dark')
        break
      }
    }
  })
}

export function subscribeCharacters (): (() => void) {
  return characters.listen((value) => {
    set('characters', value).catch((reason) => {
      console.error(`Failed to store characters: ${reason}`)
    })
  })
}

export function subscribeMessages (): (() => void) {
  return messages.listen((value) => {
    console.log(value)
    set('messages', value).catch((reason) => {
      console.error(`Failed to store messages: ${reason}`)
    })
  })
}
