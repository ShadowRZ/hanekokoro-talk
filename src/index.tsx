import { JSX, render } from 'preact'

import { ComposeSection } from './components/compose/ComposeSection'
import { Messages } from './components/messages/Messages'
import { Header } from './components/header/Header'

import './style.css'
import { AppContext, useAppContext } from './model/AppContext'
import { registerThemeHandler, removeThemeHandler } from './utils/ThemeHandler'
import { useSignalEffect } from '@preact/signals'

export function HanekokoroTalk (): JSX.Element {
  const context = useAppContext()
  const theme = 'hanekokoro-talk-theme'

  useSignalEffect(() => {
    // Update theme
    if (context.theme.value === 'system') registerThemeHandler(); else removeThemeHandler()
    switch (context.theme.value) {
      case 'light': {
        localStorage.setItem(theme, 'light')
        document.documentElement.classList.remove('dark')
        break
      }
      case 'dark': {
        localStorage.setItem(theme, 'dark')
        document.documentElement.classList.add('dark')
        break
      }
      case 'system': {
        localStorage.removeItem(theme)
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        break
      }
    }

    // Update messages
    localStorage.setItem('hanekokoro-talk-messages', JSON.stringify(context.messages.value))
    // Update characters
    localStorage.setItem('hanekokoro-talk-characters', JSON.stringify(context.characters.value))
    // Update groups
    localStorage.setItem('hanekokoro-talk-char-groups', JSON.stringify(context.charGroups.value))
    // Update Last Index
    localStorage.setItem('hanekokoro-talk-lastindex', context.lastIndex.value.toString())
    // Update Last Group
    console.log(context.lastGroup.value)
    if (context.lastGroup.value !== null) {
      localStorage.setItem('hanekokoro-talk-lastgroup', context.lastGroup.value.toString())
    } else {
      localStorage.setItem('hanekokoro-talk-lastgroup', '')
    }
    // Update sending method
    localStorage.setItem('hanekokoro-talk-sending', context.sending.value)
  })

  return (
    <AppContext.Provider value={context}>
      <div
        class='h-[100dvh] max-h-[100dvh] flex flex-col bg-white dark:bg-black text-black dark:text-white'
      >
        <Header />
        <Messages />
        <ComposeSection />
      </div>
    </AppContext.Provider>
  )
}

render(<HanekokoroTalk />, document.getElementById('app') as HTMLElement)
