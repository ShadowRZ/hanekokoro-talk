import { action, atom } from 'nanostores'
import type { TalkItem, TalkSession } from '../types'
import { produce } from 'immer'

export const messages = atom<TalkSession[]>([])

export const insertMessage = action(
  messages,
  'message.insert',
  (store, session: number, item: TalkItem) => {
    store.set(
      produce(store.get(), ($original) => {
        $original[session].items.push(item)
      })
    )
  }
)

export const newSession = action(messages, 'message.newSession', (store) => {
  store.set(
    produce(store.get(), ($original) => {
      $original.push({ items: [] })
    })
  )
})

export const updateSession = action(
  messages,
  'message.updateSession',
  (store, session: number, name?: string, desc?: string) => {
    store.set(
      produce(store.get(), ($original) => {
        if (name !== undefined) {
          $original[session].nameOverride = name !== '' ? name : undefined
        }
        if (desc !== undefined) {
          $original[session].descOverride = desc !== '' ? desc : undefined
        }
      })
    )
  }
)
