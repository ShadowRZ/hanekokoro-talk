import '@fontsource-variable/jost/wght.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

import App from './App.svelte'

import {
  subscribeCharacters,
  subscribeMessages,
  subscribeTheme
} from './lib/subscribers'
import { setup } from './lib/utils'

setup()

const unsubscribeTheme = subscribeTheme()
const unsubscribeCharacters = subscribeCharacters()
const unsubscribeMessages = subscribeMessages()
window.addEventListener('beforeunload', () => {
  unsubscribeTheme()
  unsubscribeCharacters()
  unsubscribeMessages()
})

const app = new App({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  target: document.getElementById('app')!
})

export default app
