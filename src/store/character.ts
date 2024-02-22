import { action, atom } from 'nanostores'
import type { Character } from '../types'

export const characters = atom<Character[]>([])

export const addCharacter = action(
  characters,
  'characters.add',
  (store, char: Character) => {
    const original = store.get()
    store.set([...original, char])
  }
)
